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
exports.EstadoGlucometria = void 0;
const recomendaciones_estado_entity_1 = require("../../recomendaciones-estado/entities/recomendaciones-estado.entity");
const typeorm_1 = require("typeorm");
const rango_glucometria_entity_1 = require("../../rango-glucometrias/entities/rango-glucometria.entity");
let EstadoGlucometria = class EstadoGlucometria {
};
exports.EstadoGlucometria = EstadoGlucometria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EstadoGlucometria.prototype, "idEstado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstadoGlucometria.prototype, "nombreEstado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstadoGlucometria.prototype, "descripcionEstado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recomendaciones_estado_entity_1.RecomendacionesEstado, (recomendacionesEstado) => recomendacionesEstado.estado),
    __metadata("design:type", Array)
], EstadoGlucometria.prototype, "recomendaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rango_glucometria_entity_1.RangoGlucometria, (rango) => rango.estado),
    __metadata("design:type", Array)
], EstadoGlucometria.prototype, "rangos", void 0);
exports.EstadoGlucometria = EstadoGlucometria = __decorate([
    (0, typeorm_1.Entity)()
], EstadoGlucometria);
//# sourceMappingURL=estado-glucometria.entity.js.map