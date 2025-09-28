"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientesModule = void 0;
const common_1 = require("@nestjs/common");
const ingredientes_service_1 = require("./ingredientes.service");
const ingredientes_controller_1 = require("./ingredientes.controller");
const ingredientes_receta_entity_1 = require("./../ingredientes-receta/entities/ingredientes-receta.entity");
const ingrediente_entity_1 = require("./entities/ingrediente.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let IngredientesModule = class IngredientesModule {
};
exports.IngredientesModule = IngredientesModule;
exports.IngredientesModule = IngredientesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ingredientes_receta_entity_1.IngredientesReceta, ingrediente_entity_1.Ingrediente]),
            typeorm_2.Repository,
        ],
        controllers: [ingredientes_controller_1.IngredientesController],
        providers: [ingredientes_service_1.IngredientesService],
        exports: [typeorm_1.TypeOrmModule],
    })
], IngredientesModule);
//# sourceMappingURL=ingredientes.module.js.map