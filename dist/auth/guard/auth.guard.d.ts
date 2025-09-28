import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly usuariosService;
    constructor(jwtService: JwtService, usuariosService: UsuariosService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
