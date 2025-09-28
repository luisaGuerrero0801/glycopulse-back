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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../../usuarios/usuarios.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, usuariosService) {
        this.jwtService = jwtService;
        this.usuariosService = usuariosService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Token no encontrado');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload;
            const usuario = await this.usuariosService.findOne(payload.sub);
            if (!usuario || usuario.estado !== 'Activo') {
                throw new common_1.UnauthorizedException('El usuario está inactivo o no existe');
            }
        }
        catch (error) {
            console.error('Error de autenticación:', error.message);
            throw new common_1.UnauthorizedException('Token inválido o usuario inactivo');
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        usuarios_service_1.UsuariosService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map