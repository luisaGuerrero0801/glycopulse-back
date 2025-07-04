import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
  verify(@Query('token') token: string) {
    return this.authService.verificarCuenta(token);
  }
}
