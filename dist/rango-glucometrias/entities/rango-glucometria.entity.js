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
exports.RangoGlucometria = void 0;
const estado_glucometria_entity_1 = require("../../estado-glucometria/entities/estado-glucometria.entity");
const glucometria_entity_1 = require("../../glucometrias/entities/glucometria.entity");
const momento_glucometria_enum_1 = require("../../glucometrias/enums/momento-glucometria.enum");
const typeorm_1 = require("typeorm");
let RangoGlucometria = class RangoGlucometria {
};
exports.RangoGlucometria = RangoGlucometria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RangoGlucometria.prototype, "idRango", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RangoGlucometria.prototype, "nombreRango", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], RangoGlucometria.prototype, "valorMinRango", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], RangoGlucometria.prototype, "valorMaxRango", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: momento_glucometria_enum_1.MomentoGlucometria,
    }),
    __metadata("design:type", String)
], RangoGlucometria.prototype, "momento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], RangoGlucometria.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estado_glucometria_entity_1.EstadoGlucometria, (estado) => estado.rangos, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idEstado' }),
    __metadata("design:type", estado_glucometria_entity_1.EstadoGlucometria)
], RangoGlucometria.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => glucometria_entity_1.Glucometria, (glucometria) => glucometria.rango),
    __metadata("design:type", Array)
], RangoGlucometria.prototype, "glucometrias", void 0);
exports.RangoGlucometria = RangoGlucometria = __decorate([
    (0, typeorm_1.Entity)()
], RangoGlucometria);
//# sourceMappingURL=rango-glucometria.entity.js.map