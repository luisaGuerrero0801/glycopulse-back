import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existingUser = await this.findOneByEmail(
      createUsuarioDto.correoUsuario,
    );
    if (existingUser) {
      throw new HttpException(
        'El correo electrónico ya está en uso',
        HttpStatus.OK,
      );
    }

    const fechaNacimiento = new Date(createUsuarioDto.fechaNacimientoUsuario);

    if (isNaN(fechaNacimiento.getTime())) {
      throw new HttpException(
        'La fecha de nacimiento no es válida',
        HttpStatus.OK,
      );
    }

    const salt = await bcryptjs.genSalt(10); // Generar un salt con 10 rondas de seguridad
    const hashedPassword = await bcryptjs.hash(
      createUsuarioDto.contrasenaUsuario,
      salt,
    ); // Hashear la contraseña

    // Crear el nuevo usuario
    const usuario = this.usuarios.create({
      ...createUsuarioDto,
      contrasenaUsuario: hashedPassword,
      fechaNacimientoUsuario: fechaNacimiento,
    });

    return await this.usuarios.save(usuario);
  }

  findOneByEmail(correoUsuario: string) {
    return this.usuarios.findOneBy({ correoUsuario });
  }

  async findAll() {
    return await this.usuarios.find();
  }

  async findOne(idUsuario: number) {
    return await this.usuarios.findOneBy({ idUsuario });
  }

  async update(
    idUsuario: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.usuarios.findOneBy({ idUsuario });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.OK);
    }

    const existingUser = await this.findOneByEmail(
      updateUsuarioDto.correoUsuario,
    );

    if (existingUser && existingUser.idUsuario !== idUsuario) {
      throw new HttpException(
        'El correo electrónico ya está en uso',
        HttpStatus.OK,
      );
    }
    const fechaNacimiento = new Date(updateUsuarioDto.fechaNacimientoUsuario);

    // Verificar que la conversión de la fecha es válida
    if (isNaN(fechaNacimiento.getTime())) {
      throw new HttpException(
        'La fecha de nacimiento no es válida',
        HttpStatus.OK,
      );
    }
    if (updateUsuarioDto.contrasenaUsuario) {
      const salt = await bcryptjs.genSalt(10); // Generar un salt
      updateUsuarioDto.contrasenaUsuario = await bcryptjs.hash(
        updateUsuarioDto.contrasenaUsuario,
        salt, // Hashear la contraseña
      );
    }

    Object.assign(usuario, updateUsuarioDto, {
      fechaNacimientoUsuario: fechaNacimiento,
    });

    return this.usuarios.save(usuario);
  }

  async remove(idUsuario: number) {
    const usuario = await this.usuarios.findOneBy({ idUsuario });
    if (!usuario) {
      throw new HttpException('Esta Usuario No existe', HttpStatus.OK);
    }
    await this.usuarios.delete(idUsuario);
    throw new HttpException('Usuario eliminado correctamente', HttpStatus.OK);
  }
}
