"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoGlucometriasModule = void 0;
const common_1 = require("@nestjs/common");
const rango_glucometrias_service_1 = require("./rango-glucometrias.service");
const rango_glucometrias_controller_1 = require("./rango-glucometrias.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rango_glucometria_entity_1 = require("./entities/rango-glucometria.entity");
const glucometria_entity_1 = require("../glucometrias/entities/glucometria.entity");
const estado_glucometria_entity_1 = require("../estado-glucometria/entities/estado-glucometria.entity");
const estado_glucometria_module_1 = require("../estado-glucometria/estado-glucometria.module");
let RangoGlucometriasModule = class RangoGlucometriasModule {
};
exports.RangoGlucometriasModule = RangoGlucometriasModule;
exports.RangoGlucometriasModule = RangoGlucometriasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                rango_glucometria_entity_1.RangoGlucometria,
                glucometria_entity_1.Glucometria,
                estado_glucometria_entity_1.EstadoGlucometria,
            ]),
            typeorm_2.Repository,
            estado_glucometria_module_1.EstadoGlucometriaModule,
        ],
        controllers: [rango_glucometrias_controller_1.RangoGlucometriasController],
        providers: [rango_glucometrias_service_1.RangoGlucometriasService],
        exports: [typeorm_1.TypeOrmModule],
    })
], RangoGlucometriasModule);
//# sourceMappingURL=rango-glucometrias.module.js.map