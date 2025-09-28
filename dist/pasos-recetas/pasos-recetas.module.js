"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasosRecetasModule = void 0;
const common_1 = require("@nestjs/common");
const pasos_recetas_service_1 = require("./pasos-recetas.service");
const pasos_recetas_controller_1 = require("./pasos-recetas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const receta_entity_1 = require("../recetas/entities/receta.entity");
const pasos_receta_entity_1 = require("./entities/pasos-receta.entity");
let PasosRecetasModule = class PasosRecetasModule {
};
exports.PasosRecetasModule = PasosRecetasModule;
exports.PasosRecetasModule = PasosRecetasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pasos_receta_entity_1.PasosReceta, receta_entity_1.Receta]), typeorm_2.Repository],
        controllers: [pasos_recetas_controller_1.PasosRecetasController],
        providers: [pasos_recetas_service_1.PasosRecetasService],
    })
], PasosRecetasModule);
//# sourceMappingURL=pasos-recetas.module.js.map