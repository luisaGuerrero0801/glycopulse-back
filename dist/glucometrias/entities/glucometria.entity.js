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
exports.Glucometria = void 0;
const rango_glucometria_entity_1 = require("../../rango-glucometrias/entities/rango-glucometria.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const typeorm_1 = require("typeorm");
const momento_glucometria_enum_1 = require("../enums/momento-glucometria.enum");
let Glucometria = class Glucometria {
};
exports.Glucometria = Glucometria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Glucometria.prototype, "idGlucometria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Glucometria.prototype, "fechaGlucometria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Glucometria.prototype, "horaGlucometria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Glucometria.prototype, "nivelGlucometria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: momento_glucometria_enum_1.MomentoGlucometria }),
    __metadata("design:type", String)
], Glucometria.prototype, "momento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.glucometrias),
    (0, typeorm_1.JoinColumn)({ name: 'idUsuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Glucometria.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rango_glucometria_entity_1.RangoGlucometria, (rango) => rango.glucometrias, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idRango' }),
    __metadata("design:type", rango_glucometria_entity_1.RangoGlucometria)
], Glucometria.prototype, "rango", void 0);
exports.Glucometria = Glucometria = __decorate([
    (0, typeorm_1.Entity)()
], Glucometria);
//# sourceMappingURL=glucometria.entity.js.map