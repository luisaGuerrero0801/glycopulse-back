import { Body, Controller, Post, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RecoverAccountDto } from './dto/recover-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔐 Login solo si el usuario está activo y verificado
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // ✅ Endpoint para activar/verificar la cuenta desde el correo
  @Get('verify')
  async verificarCuenta(@Query('token') token: string, @Res() res: Response) {
    try {
      const result = await this.authService.verificarCuenta(token);

      // Redirige al frontend con mensaje de éxito
      const frontendUrl = process.env.FRONTEND_URL;
      return res.redirect(
        `${frontendUrl}/verification-success?message=${encodeURIComponent(result.message)}`
      );
    } catch (error) {
      // Redirige al frontend con mensaje de error
      const frontendUrl = process.env.FRONTEND_URL;
      return res.redirect(
        `${frontendUrl}/verification-failed?message=${encodeURIComponent(error.message)}`
      );
    }
  }

  @Post('recuperar-cuenta')
  recuperarCuenta(@Body() dto: RecoverAccountDto) {
    return this.authService.enviarCorreoRecuperacion(dto.correo);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetearContrasena(dto.token, dto.nuevaContrasena);
  }
}
