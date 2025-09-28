"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecomendacionesEstadoModule = void 0;
const common_1 = require("@nestjs/common");
const recomendaciones_estado_service_1 = require("./recomendaciones-estado.service");
const recomendaciones_estado_controller_1 = require("./recomendaciones-estado.controller");
const typeorm_1 = require("@nestjs/typeorm");
const recomendaciones_glucometria_entity_1 = require("../recomendaciones-glucometria/entities/recomendaciones-glucometria.entity");
const recomendaciones_estado_entity_1 = require("./entities/recomendaciones-estado.entity");
const estado_glucometria_entity_1 = require("../estado-glucometria/entities/estado-glucometria.entity");
const typeorm_2 = require("typeorm");
const estado_glucometria_module_1 = require("../estado-glucometria/estado-glucometria.module");
const recomendaciones_glucometria_module_1 = require("../recomendaciones-glucometria/recomendaciones-glucometria.module");
let RecomendacionesEstadoModule = class RecomendacionesEstadoModule {
};
exports.RecomendacionesEstadoModule = RecomendacionesEstadoModule;
exports.RecomendacionesEstadoModule = RecomendacionesEstadoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                recomendaciones_glucometria_entity_1.RecomendacionesGlucometria,
                recomendaciones_estado_entity_1.RecomendacionesEstado,
                estado_glucometria_entity_1.EstadoGlucometria,
            ]),
            typeorm_2.Repository,
            estado_glucometria_module_1.EstadoGlucometriaModule,
            recomendaciones_glucometria_module_1.RecomendacionesGlucometriaModule,
        ],
        controllers: [recomendaciones_estado_controller_1.RecomendacionesEstadoController],
        providers: [recomendaciones_estado_service_1.RecomendacionesEstadoService],
        exports: [typeorm_1.TypeOrmModule],
    })
], RecomendacionesEstadoModule);
//# sourceMappingURL=recomendaciones-estado.module.js.map