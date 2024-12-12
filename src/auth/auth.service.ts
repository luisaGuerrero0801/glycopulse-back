import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ correoUsuario, contrasenaUsuario }: LoginDto) {
    const user = await this.usuariosService.findOneByEmail(correoUsuario);

    if (!user) {
      throw new UnauthorizedException('Su email no se encuentra registrado');
    }

    const contraseñaValida = await bcryptjs.compare(
      contrasenaUsuario,
      user.contrasenaUsuario,
    );

    if (!contraseñaValida) {
      throw new UnauthorizedException('contraseña invalida');
    }

    const payload = { contrasena: user.contrasenaUsuario };

    const token = await this.jwtService.signAsync(payload);

    return { token, correoUsuario };
  }
}
