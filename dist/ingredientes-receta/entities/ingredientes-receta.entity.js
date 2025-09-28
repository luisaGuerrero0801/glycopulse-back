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
exports.IngredientesReceta = void 0;
const typeorm_1 = require("typeorm");
const receta_entity_1 = require("../../recetas/entities/receta.entity");
const ingrediente_entity_1 = require("../../ingredientes/entities/ingrediente.entity");
let IngredientesReceta = class IngredientesReceta {
};
exports.IngredientesReceta = IngredientesReceta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IngredientesReceta.prototype, "idIngredienteReceta", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], IngredientesReceta.prototype, "cantidadIngredienteReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], IngredientesReceta.prototype, "medidaIngredienteReceta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receta_entity_1.Receta, (receta) => receta.ingredientes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idReceta' }),
    __metadata("design:type", receta_entity_1.Receta)
], IngredientesReceta.prototype, "receta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ingrediente_entity_1.Ingrediente, (ingrediente) => ingrediente.recetas, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idIngrediente' }),
    __metadata("design:type", ingrediente_entity_1.Ingrediente)
], IngredientesReceta.prototype, "ingrediente", void 0);
exports.IngredientesReceta = IngredientesReceta = __decorate([
    (0, typeorm_1.Entity)()
], IngredientesReceta);
//# sourceMappingURL=ingredientes-receta.entity.js.map