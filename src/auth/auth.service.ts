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

    if (user.estado !== 'Activo') {
      throw new UnauthorizedException('Usuario inhabilitado');
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
      throw new UnauthorizedException('Token inválido o expirado.', error);
    }
  }

  async enviarCorreoRecuperacion(correo: string) {
    const usuario = await this.usuariosService.findOneByEmail(correo);
    if (!usuario) {
      // No informamos si existe o no para proteger la privacidad
      return {
        message: 'Si el correo está registrado, se enviará un mensaje.',
      };
    }

    const token = await this.jwtService.signAsync(
      { sub: usuario.idUsuario },
      {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      }
    );

    await this.mailerService.sendRecoveryEmail(usuario.correoUsuario, token);

    return { message: 'Correo de recuperación enviado.' };
  }

  async resetearContrasena(token: string, nuevaContrasena: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const usuario = await this.usuariosService.findOne(payload.sub);
      if (!usuario) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(nuevaContrasena, salt);

      usuario.contrasenaUsuario = hash;
      await this.usuariosService.save(usuario);

      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      console.error('❌ Error al resetear contraseña:', error); // ✅ ahora se usa

      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
