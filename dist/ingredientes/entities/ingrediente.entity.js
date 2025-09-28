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
exports.Ingrediente = void 0;
const typeorm_1 = require("typeorm");
const ingredientes_receta_entity_1 = require("../../ingredientes-receta/entities/ingredientes-receta.entity");
let Ingrediente = class Ingrediente {
    normalizeName() {
        this.nombreIngrediente = this.nombreIngrediente
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
};
exports.Ingrediente = Ingrediente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ingrediente.prototype, "idIngrediente", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Ingrediente.prototype, "nombreIngrediente", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ingredientes_receta_entity_1.IngredientesReceta, (ingredientesReceta) => ingredientesReceta.ingrediente),
    __metadata("design:type", Array)
], Ingrediente.prototype, "recetas", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Ingrediente.prototype, "normalizeName", null);
exports.Ingrediente = Ingrediente = __decorate([
    (0, typeorm_1.Entity)()
], Ingrediente);
//# sourceMappingURL=ingrediente.entity.js.map