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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const rol_entity_1 = require("../../roles/entities/rol.entity");
const glucometria_entity_1 = require("../../glucometrias/entities/glucometria.entity");
const receta_entity_1 = require("../../recetas/entities/receta.entity");
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombresUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "apellidosUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Usuario.prototype, "fechaNacimientoUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "generoUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Usuario.prototype, "rhUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "correoUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasenaUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Usuario.prototype, "celularUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "ciudadUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "paisUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Activo' }),
    __metadata("design:type", String)
], Usuario.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "verificado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "idUsuarioResponsable", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol, (rol) => rol.usuarios),
    (0, typeorm_1.JoinColumn)({ name: 'idRol' }),
    __metadata("design:type", rol_entity_1.Rol)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => glucometria_entity_1.Glucometria, (glucometria) => glucometria.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "glucometrias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receta_entity_1.Receta, (receta) => receta.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "recetas", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)()
], Usuario);
//# sourceMappingURL=usuario.entity.js.map