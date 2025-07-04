import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mail/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService // se necesita para enviar el correo
  ) {}

  async login({ correoUsuario, contrasenaUsuario }: LoginDto) {
    const user = await this.usuariosService.findOneByEmail(correoUsuario);

    if (!user) {
      throw new UnauthorizedException('Su email no se encuentra registrado');
    }

    const contraseniaValida = await bcryptjs.compare(
      contrasenaUsuario,
      user.contrasenaUsuario
    );

    if (!contraseniaValida) {
      throw new UnauthorizedException('Contraseña inválida');
    }

    // ⛔ No permitir login si no ha verificado su cuenta
    if (!user.verificado) {
      throw new UnauthorizedException(
        'Debes verificar tu cuenta por correo antes de iniciar sesión.'
      );
    }

    const payload = {
      sub: user.idUsuario,
      emailUser: user.correoUsuario,
      rol: user.rol?.nombreRol,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      correoUsuario: user.correoUsuario,
      rol: user.rol?.nombreRol,
    };
  }

  async verificarCuenta(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const usuario = await this.usuariosService.findOneById(payload.sub);

      if (!usuario) {
        throw new UnauthorizedException('Usuario no encontrado.');
      }

      if (usuario.verificado) {
        return { message: 'La cuenta ya fue verificada.' };
      }

      usuario.verificado = true;
      await this.usuariosService.save(usuario);

      return { message: '✅ Cuenta verificada con éxito.' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }
}
