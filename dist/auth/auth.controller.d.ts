import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RecoverAccountDto } from './dto/recover-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        token: string;
        correoUsuario: string;
        rol: string;
    }>;
    verificarCuenta(token: string, res: Response): Promise<void>;
    recuperarCuenta(dto: RecoverAccountDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
