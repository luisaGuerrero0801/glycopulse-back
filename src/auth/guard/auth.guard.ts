import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // Guardamos el payload en la request
      request.user = payload;

      // Verificamos el estado del usuario
      const usuario = await this.usuariosService.findOne(payload.sub);

      if (!usuario || usuario.estado !== 'Activo') {
        throw new UnauthorizedException('El usuario está inactivo o no existe');
      }

    } catch (error) {
      console.error('Error de autenticación:', error.message);
      throw new UnauthorizedException('Token inválido o usuario inactivo');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
