"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecetasModule = void 0;
const ingredientes_receta_entity_1 = require("./../ingredientes-receta/entities/ingredientes-receta.entity");
const common_1 = require("@nestjs/common");
const recetas_service_1 = require("./recetas.service");
const recetas_controller_1 = require("./recetas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const receta_entity_1 = require("./entities/receta.entity");
const typeorm_2 = require("typeorm");
const roles_guard_1 = require("../auth/guard/roles.guard");
const usuarios_module_1 = require("../usuarios/usuarios.module");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const ingrediente_entity_1 = require("../ingredientes/entities/ingrediente.entity");
const pasos_receta_entity_1 = require("../pasos-recetas/entities/pasos-receta.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_guard_1 = require("../auth/guard/auth.guard");
let RecetasModule = class RecetasModule {
};
exports.RecetasModule = RecetasModule;
exports.RecetasModule = RecetasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([
                receta_entity_1.Receta,
                usuario_entity_1.Usuario,
                ingredientes_receta_entity_1.IngredientesReceta,
                ingrediente_entity_1.Ingrediente,
                pasos_receta_entity_1.PasosReceta,
            ]),
            typeorm_2.Repository,
            usuarios_module_1.UsuariosModule,
            config_1.ConfigModule,
        ],
        controllers: [recetas_controller_1.RecetasController],
        providers: [recetas_service_1.RecetasService, roles_guard_1.RolesGuard, auth_guard_1.AuthGuard],
        exports: [recetas_service_1.RecetasService, typeorm_1.TypeOrmModule],
    })
], RecetasModule);
//# sourceMappingURL=recetas.module.js.map