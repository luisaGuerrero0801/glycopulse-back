"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientesRecetaModule = void 0;
const common_1 = require("@nestjs/common");
const ingredientes_receta_service_1 = require("./ingredientes-receta.service");
const ingredientes_receta_controller_1 = require("./ingredientes-receta.controller");
const typeorm_1 = require("@nestjs/typeorm");
const ingrediente_entity_1 = require("../ingredientes/entities/ingrediente.entity");
const ingredientes_receta_entity_1 = require("./../ingredientes-receta/entities/ingredientes-receta.entity");
const typeorm_2 = require("typeorm");
const receta_entity_1 = require("../recetas/entities/receta.entity");
let IngredientesRecetaModule = class IngredientesRecetaModule {
};
exports.IngredientesRecetaModule = IngredientesRecetaModule;
exports.IngredientesRecetaModule = IngredientesRecetaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([receta_entity_1.Receta, ingredientes_receta_entity_1.IngredientesReceta, ingrediente_entity_1.Ingrediente]),
            typeorm_2.Repository,
        ],
        controllers: [ingredientes_receta_controller_1.IngredientesRecetaController],
        providers: [ingredientes_receta_service_1.IngredientesRecetaService],
        exports: [typeorm_1.TypeOrmModule],
    })
], IngredientesRecetaModule);
//# sourceMappingURL=ingredientes-receta.module.js.map