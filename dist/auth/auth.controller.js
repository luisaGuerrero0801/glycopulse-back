"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const recover_account_dto_1 = require("./dto/recover-account.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    async verificarCuenta(token, res) {
        if (!token) {
            return this.enviarRespuestaHTML(res, false, 'Token no proporcionado');
        }
        try {
            const result = await this.authService.verificarCuenta(token);
            return this.enviarRespuestaHTML(res, true, result.message);
        }
        catch (error) {
            return this.enviarRespuestaHTML(res, false, error.message || 'Token inválido o expirado');
        }
    }
    async verificarCuentaAPI(token) {
        if (!token) {
            throw new common_1.UnauthorizedException('Token no proporcionado');
        }
        try {
            const result = await this.authService.verificarCuenta(token);
            return { message: result.message };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message || 'Token inválido o expirado');
        }
    }
    enviarRespuestaHTML(res, exito, mensaje) {
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
    recuperarCuenta(dto) {
        return this.authService.enviarCorreoRecuperacion(dto.correo);
    }
    resetPassword(dto) {
        return this.authService.resetearContrasena(dto.token, dto.nuevaContrasena);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('verify'),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verificarCuenta", null);
__decorate([
    (0, common_1.Post)('verify-token'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verificarCuentaAPI", null);
__decorate([
    (0, common_1.Post)('recuperar-cuenta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recover_account_dto_1.RecoverAccountDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "recuperarCuenta", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map