import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mail/mailer.service';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    private readonly mailerService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService, mailerService: MailerService);
    login({ correoUsuario, contrasenaUsuario }: LoginDto): Promise<{
        token: string;
        correoUsuario: string;
        rol: string;
    }>;
    verificarCuenta(token: string): Promise<{
        message: string;
    }>;
    enviarCorreoRecuperacion(correo: string): Promise<{
        message: string;
    }>;
    resetearContrasena(token: string, nuevaContrasena: string): Promise<{
        message: string;
    }>;
}
