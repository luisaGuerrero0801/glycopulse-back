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
exports.PasosReceta = void 0;
const typeorm_1 = require("typeorm");
const receta_entity_1 = require("../../recetas/entities/receta.entity");
let PasosReceta = class PasosReceta {
};
exports.PasosReceta = PasosReceta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PasosReceta.prototype, "idPasoReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PasosReceta.prototype, "ordenPasoReceta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PasosReceta.prototype, "descripcionPasoReceta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receta_entity_1.Receta, (receta) => receta.pasos, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idReceta' }),
    __metadata("design:type", receta_entity_1.Receta)
], PasosReceta.prototype, "receta", void 0);
exports.PasosReceta = PasosReceta = __decorate([
    (0, typeorm_1.Entity)()
], PasosReceta);
//# sourceMappingURL=pasos-receta.entity.js.map