import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RecoverAccountDto } from './dto/recover-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔐 Login solo si el usuario está activo y verificado
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // ✅ Endpoint para activar/verificar la cuenta desde el correo (siempre HTML)
  @Get('verify')
  async verificarCuenta(@Query('token') token: string, @Res() res: Response) {
    if (!token) {
      return this.enviarRespuestaHTML(res, false, 'Token no proporcionado');
    }

    try {
      const result = await this.authService.verificarCuenta(token);
      return this.enviarRespuestaHTML(res, true, result.message);
    } catch (error) {
      return this.enviarRespuestaHTML(
        res,
        false,
        error.message || 'Token inválido o expirado'
      );
    }
  }

  // 🔧 Endpoint adicional para verificación desde la app (siempre JSON)
  @Post('verify-token')
  async verificarCuentaAPI(@Body('token') token: string) {
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const result = await this.authService.verificarCuenta(token);
      return { message: result.message };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Token inválido o expirado'
      );
    }
  }

  // Método privado para generar respuesta HTML
  private enviarRespuestaHTML(res: Response, exito: boolean, mensaje: string) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificación de Cuenta - GlycoPulse</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            .logo {
                color: #2563eb;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .icon {
                font-size: 60px;
                margin-bottom: 20px;
            }
            .success { color: #22c55e; }
            .error { color: #ef4444; }
            .message {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
                color: #374151;
            }
            .redirect-info {
                color: #6b7280;
                font-size: 14px;
                margin-bottom: 30px;
            }
            .button {
                display: inline-block;
                padding: 12px 30px;
                background-color: #2563eb;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #1d4ed8;
            }
            .countdown {
                font-weight: bold;
                color: #2563eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">GlycoPulse</div>
            <div class="icon ${exito ? 'success' : 'error'}">
                ${exito ? '✅' : '❌'}
            </div>
            <div class="message">${mensaje}</div>
            <div class="redirect-info">
                Serás redirigido al login en <span class="countdown" id="countdown">5</span> segundos...
            </div>
            <a href="${frontendUrl}" class="button">Ir al Login Ahora</a>
        </div>

        <script>
            let segundos = 5;
            const countdownElement = document.getElementById('countdown');
            
            const interval = setInterval(() => {
                segundos--;
                countdownElement.textContent = segundos;
                
                if (segundos <= 0) {
                    clearInterval(interval);
                    window.location.href = '${frontendUrl}';
                }
            }, 1000);
        </script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
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
