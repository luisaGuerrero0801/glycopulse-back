import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Rol) private readonly roles: Repository<Rol>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const rol = await this.roles.findOne({
      where: { idRol: createUsuarioDto.idRol },
    });

    if (!rol) throw new NotFoundException('Id de Rol no encontrado');

    const existingUser = await this.findOneByEmail(createUsuarioDto.correoUsuario);
    if (existingUser) {
      throw new HttpException('El correo electrónico ya está en uso', HttpStatus.OK);
    }

    const fechaNacimiento = new Date(createUsuarioDto.fechaNacimientoUsuario);
    if (isNaN(fechaNacimiento.getTime())) {
      throw new HttpException('La fecha de nacimiento no es válida', HttpStatus.OK);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(createUsuarioDto.contrasenaUsuario, salt);

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

    return await this.usuarios.save(usuario);
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
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.usuarios.findOneBy({ idUsuario });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.OK);
    }

    const existingUser = await this.findOneByEmail(updateUsuarioDto.correoUsuario);
    if (existingUser && existingUser.idUsuario !== idUsuario) {
      throw new HttpException('El correo electrónico ya está en uso', HttpStatus.OK);
    }

    const fechaNacimiento = new Date(updateUsuarioDto.fechaNacimientoUsuario);
    if (isNaN(fechaNacimiento.getTime())) {
      throw new HttpException('La fecha de nacimiento no es válida', HttpStatus.OK);
    }

    if (updateUsuarioDto.contrasenaUsuario) {
      const salt = await bcryptjs.genSalt(10);
      updateUsuarioDto.contrasenaUsuario = await bcryptjs.hash(
        updateUsuarioDto.contrasenaUsuario,
        salt,
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
      throw new HttpException('Este usuario no existe', HttpStatus.OK);
    }
    await this.usuarios.delete(idUsuario);
    throw new HttpException('Usuario eliminado correctamente', HttpStatus.OK);
  }

  // ✅ Actualizado para aceptar un booleano
  async cambiarEstado(idUsuario: number, activo: boolean): Promise<Usuario> {
    const usuario = await this.usuarios.findOneBy({ idUsuario });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    usuario.estado = activo ? 'Activo' : 'Inactivo';
    return await this.usuarios.save(usuario);
  }
}
