"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoGlucometriaModule = void 0;
const common_1 = require("@nestjs/common");
const estado_glucometria_service_1 = require("./estado-glucometria.service");
const estado_glucometria_controller_1 = require("./estado-glucometria.controller");
const typeorm_1 = require("@nestjs/typeorm");
const estado_glucometria_entity_1 = require("./entities/estado-glucometria.entity");
const typeorm_2 = require("typeorm");
const recomendaciones_estado_entity_1 = require("../recomendaciones-estado/entities/recomendaciones-estado.entity");
const recomendaciones_glucometria_entity_1 = require("../recomendaciones-glucometria/entities/recomendaciones-glucometria.entity");
let EstadoGlucometriaModule = class EstadoGlucometriaModule {
};
exports.EstadoGlucometriaModule = EstadoGlucometriaModule;
exports.EstadoGlucometriaModule = EstadoGlucometriaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                estado_glucometria_entity_1.EstadoGlucometria,
                recomendaciones_estado_entity_1.RecomendacionesEstado,
                recomendaciones_glucometria_entity_1.RecomendacionesGlucometria,
            ]),
            typeorm_2.Repository,
        ],
        controllers: [estado_glucometria_controller_1.EstadoGlucometriaController],
        providers: [estado_glucometria_service_1.EstadoGlucometriaService],
    })
], EstadoGlucometriaModule);
//# sourceMappingURL=estado-glucometria.module.js.map