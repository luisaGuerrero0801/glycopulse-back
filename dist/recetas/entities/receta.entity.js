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
exports.Receta = void 0;
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const ingredientes_receta_entity_1 = require("../../ingredientes-receta/entities/ingredientes-receta.entity");
const pasos_receta_entity_1 = require("../../pasos-recetas/entities/pasos-receta.entity");
const typeorm_1 = require("typeorm");
let Receta = class Receta {
};
exports.Receta = Receta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Receta.prototype, "idReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Receta.prototype, "nombreReceta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Receta.prototype, "descripcionReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Receta.prototype, "porcionesReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Receta.prototype, "caloriasReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Receta.prototype, "tiempoReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Receta.prototype, "imagenReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Receta.prototype, "nivelReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Receta.prototype, "categoriaReceta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.recetas),
    (0, typeorm_1.JoinColumn)({ name: 'idUsuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Receta.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ingredientes_receta_entity_1.IngredientesReceta, (ingredientesReceta) => ingredientesReceta.receta, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Receta.prototype, "ingredientes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pasos_receta_entity_1.PasosReceta, (pasos) => pasos.receta, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Receta.prototype, "pasos", void 0);
exports.Receta = Receta = __decorate([
    (0, typeorm_1.Entity)()
], Receta);
//# sourceMappingURL=receta.entity.js.map