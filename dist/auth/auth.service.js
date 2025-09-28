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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mail/mailer.service");
let AuthService = class AuthService {
    constructor(usuariosService, jwtService, mailerService) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async login({ correoUsuario, contrasenaUsuario }) {
        const user = await this.usuariosService.findOneByEmail(correoUsuario);
        if (!user) {
            throw new common_1.UnauthorizedException('Su email no se encuentra registrado');
        }
        const contraseniaValida = await bcryptjs.compare(contrasenaUsuario, user.contrasenaUsuario);
        if (!contraseniaValida) {
            throw new common_1.UnauthorizedException('Contraseña inválida');
        }
        if (user.estado !== 'Activo') {
            throw new common_1.UnauthorizedException('Usuario inhabilitado');
        }
        if (!user.verificado) {
            throw new common_1.UnauthorizedException('Debes verificar tu cuenta por correo antes de iniciar sesión.');
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
    async verificarCuenta(token) {
        try {
            const payload = this.jwtService.verify(token);
            const usuario = await this.usuariosService.findOneById(payload.sub);
            if (!usuario) {
                throw new common_1.UnauthorizedException('Usuario no encontrado.');
            }
            if (usuario.verificado) {
                return { message: 'La cuenta ya fue verificada.' };
            }
            usuario.verificado = true;
            await this.usuariosService.save(usuario);
            return { message: '✅ Cuenta verificada con éxito.' };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido o expirado.', error);
        }
    }
    async enviarCorreoRecuperacion(correo) {
        const usuario = await this.usuariosService.findOneByEmail(correo);
        if (!usuario) {
            return {
                message: 'Si el correo está registrado, se enviará un mensaje.',
            };
        }
        const token = await this.jwtService.signAsync({ sub: usuario.idUsuario }, {
            expiresIn: '30m',
            secret: process.env.JWT_SECRET,
        });
        await this.mailerService.sendRecoveryEmail(usuario.correoUsuario, token);
        return { message: 'Correo de recuperación enviado.' };
    }
    async resetearContrasena(token, nuevaContrasena) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            const usuario = await this.usuariosService.findOne(payload.sub);
            if (!usuario) {
                throw new common_1.UnauthorizedException('Usuario no encontrado');
            }
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(nuevaContrasena, salt);
            usuario.contrasenaUsuario = hash;
            await this.usuariosService.save(usuario);
            return { message: 'Contraseña actualizada correctamente' };
        }
        catch (error) {
            console.error('❌ Error al resetear contraseña:', error);
            throw new common_1.UnauthorizedException('Token inválido o expirado');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map