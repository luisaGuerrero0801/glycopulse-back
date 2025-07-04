import {
  ConflictException,
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import * as bcryptjs from 'bcryptjs';
import { MailerService } from 'src/mail/mailer.service'; // ✅

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarios: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly roles: Repository<Rol>,

    private readonly mailerService: MailerService // ✅ inyección
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const rol = await this.roles.findOne({
      where: { idRol: createUsuarioDto.idRol },
    });

    if (!rol) throw new NotFoundException('Id de Rol no encontrado');

    const existingUser = await this.findOneByEmail(
      createUsuarioDto.correoUsuario
    );
    if (existingUser) {
      throw new ConflictException('Correo electrónico ya está en uso');
    }

    const fechaNacimiento = new Date(createUsuarioDto.fechaNacimientoUsuario);
    if (isNaN(fechaNacimiento.getTime())) {
      throw new BadRequestException('La fecha de nacimiento no es válida');
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(
      createUsuarioDto.contrasenaUsuario,
      salt
    );

    const usuario = this.usuarios.create({
      nombresUsuario: createUsuarioDto.nombresUsuario,
      apellidosUsuario: createUsuarioDto.apellidosUsuario,
      generoUsuario: createUsuarioDto.generoUsuario,
      rhUsuario: createUsuarioDto.rhUsuario,
      correoUsuario: createUsuarioDto.correoUsuario,
      contrasenaUsuario: hashedPassword,
      ciudadUsuario: createUsuarioDto.ciudadUsuario,
      paisUsuario: createUsuarioDto.paisUsuario,
      fechaNacimientoUsuario: fechaNacimiento,
      estado: 'Activo',
      rol,
    });

    const usuarioGuardado = await this.usuarios.save(usuario);

    // ✅ Enviar correo de verificación con token
    try {
      const token = await this.mailerService.generateVerificationToken(
        usuarioGuardado.idUsuario
      );
      await this.mailerService.sendVerificationEmail(
        usuarioGuardado.correoUsuario,
        token
      );
    } catch (error) {
      console.error(
        '⚠️ No se pudo enviar el correo de verificación:',
        error.message
      );
    }

    return usuarioGuardado;
  }

  async findOneByEmail(correoUsuario: string) {
    return this.usuarios.findOne({
      where: { correoUsuario },
      relations: ['rol'],
    });
  }

  async findAll() {
    return await this.usuarios.find({ relations: ['rol'] });
  }

  async findOne(idUsuario: number) {
    return await this.usuarios.findOne({
      where: { idUsuario },
      relations: ['rol'],
    });
  }

  async update(
    idUsuario: number,
    updateUsuarioDto: UpdateUsuarioDto
  ): Promise<Usuario> {
    const usuario = await this.usuarios.findOneBy({ idUsuario });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const existingUser = await this.findOneByEmail(
      updateUsuarioDto.correoUsuario
    );
    if (existingUser && existingUser.idUsuario !== idUsuario) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    const fechaNacimiento = new Date(updateUsuarioDto.fechaNacimientoUsuario);
    if (isNaN(fechaNacimiento.getTime())) {
      throw new BadRequestException('La fecha de nacimiento no es válida');
    }

    if (updateUsuarioDto.contrasenaUsuario) {
      const salt = await bcryptjs.genSalt(10);
      updateUsuarioDto.contrasenaUsuario = await bcryptjs.hash(
        updateUsuarioDto.contrasenaUsuario,
        salt
      );
    }

    if (updateUsuarioDto.idRol) {
      const rol = await this.roles.findOne({
        where: { idRol: updateUsuarioDto.idRol },
      });
      if (!rol) throw new NotFoundException(`Id de rol no encontrado`);
      usuario.rol = rol;
    }

    Object.assign(usuario, updateUsuarioDto, {
      fechaNacimientoUsuario: fechaNacimiento,
    });

    return this.usuarios.save(usuario);
  }

  async remove(idUsuario: number) {
    const usuario = await this.usuarios.findOneBy({ idUsuario });
    if (!usuario) {
      throw new NotFoundException('Este usuario no existe');
    }
    await this.usuarios.delete(idUsuario);
    return { message: 'Usuario eliminado correctamente' };
  }

  async cambiarEstado(idUsuario: number, activo: boolean): Promise<Usuario> {
    const usuario = await this.usuarios.findOneBy({ idUsuario });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.estado = activo ? 'Activo' : 'Inactivo';
    return await this.usuarios.save(usuario);
  }

  async countByRolAndRh() {
    return this.usuarios
      .createQueryBuilder('usuario')
      .select('rol.nombreRol', 'rol')
      .addSelect('usuario.rhUsuario', 'rh')
      .addSelect('COUNT(*)', 'cantidad')
      .innerJoin('usuario.rol', 'rol')
      .where('usuario.estado = :estado', { estado: 'Activo' })
      .groupBy('rol.nombreRol')
      .addGroupBy('usuario.rhUsuario')
      .getRawMany();
  }

  async findOneById(id: number): Promise<Usuario | null> {
    return this.usuarios.findOne({
      where: { idUsuario: id },
      relations: ['rol'],
    });
  }

  async save(usuario: Usuario): Promise<Usuario> {
    return await this.usuarios.save(usuario);
  }
}
