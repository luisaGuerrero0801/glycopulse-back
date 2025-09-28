"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecomendacionesGlucometriaModule = void 0;
const common_1 = require("@nestjs/common");
const recomendaciones_glucometria_service_1 = require("./recomendaciones-glucometria.service");
const recomendaciones_glucometria_controller_1 = require("./recomendaciones-glucometria.controller");
const typeorm_1 = require("@nestjs/typeorm");
const recomendaciones_glucometria_entity_1 = require("./entities/recomendaciones-glucometria.entity");
const recomendaciones_estado_entity_1 = require("../recomendaciones-estado/entities/recomendaciones-estado.entity");
const typeorm_2 = require("typeorm");
let RecomendacionesGlucometriaModule = class RecomendacionesGlucometriaModule {
};
exports.RecomendacionesGlucometriaModule = RecomendacionesGlucometriaModule;
exports.RecomendacionesGlucometriaModule = RecomendacionesGlucometriaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                recomendaciones_glucometria_entity_1.RecomendacionesGlucometria,
                recomendaciones_estado_entity_1.RecomendacionesEstado,
            ]),
            typeorm_2.Repository,
        ],
        controllers: [recomendaciones_glucometria_controller_1.RecomendacionesGlucometriaController],
        providers: [recomendaciones_glucometria_service_1.RecomendacionesGlucometriaService],
        exports: [typeorm_1.TypeOrmModule],
    })
], RecomendacionesGlucometriaModule);
//# sourceMappingURL=recomendaciones-glucometria.module.js.map