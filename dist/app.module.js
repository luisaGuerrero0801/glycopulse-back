"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const recetas_module_1 = require("./recetas/recetas.module");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const auth_module_1 = require("./auth/auth.module");
const glucometrias_module_1 = require("./glucometrias/glucometrias.module");
const roles_module_1 = require("./roles/roles.module");
const seed_service_1 = require("./seeds/seed.service");
const usuario_entity_1 = require("./usuarios/entities/usuario.entity");
const rol_entity_1 = require("./roles/entities/rol.entity");
const ingredientes_module_1 = require("./ingredientes/ingredientes.module");
const ingredientes_receta_module_1 = require("./ingredientes-receta/ingredientes-receta.module");
const pasos_recetas_module_1 = require("./pasos-recetas/pasos-recetas.module");
const recomendaciones_glucometria_module_1 = require("./recomendaciones-glucometria/recomendaciones-glucometria.module");
const estado_glucometria_module_1 = require("./estado-glucometria/estado-glucometria.module");
const recomendaciones_estado_module_1 = require("./recomendaciones-estado/recomendaciones-estado.module");
const rango_glucometrias_module_1 = require("./rango-glucometrias/rango-glucometrias.module");
const seed_usuario_rol_service_1 = require("./seeds/seed-usuario-rol.service");
const seed_estado_service_1 = require("./seeds/seed-estado.service");
const seed_rango_service_1 = require("./seeds/seed-rango.service");
const seed_recomendaciones_service_1 = require("./seeds/seed-recomendaciones.service");
const seed_recomendaciones_estado_service_1 = require("./seeds/seed-recomendaciones-estado.service");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, rol_entity_1.Rol]),
            recetas_module_1.RecetasModule,
            usuarios_module_1.UsuariosModule,
            auth_module_1.AuthModule,
            glucometrias_module_1.GlucometriasModule,
            roles_module_1.RolesModule,
            ingredientes_module_1.IngredientesModule,
            ingredientes_receta_module_1.IngredientesRecetaModule,
            pasos_recetas_module_1.PasosRecetasModule,
            recomendaciones_glucometria_module_1.RecomendacionesGlucometriaModule,
            estado_glucometria_module_1.EstadoGlucometriaModule,
            recomendaciones_estado_module_1.RecomendacionesEstadoModule,
            rango_glucometrias_module_1.RangoGlucometriasModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            seed_service_1.SeedService,
            seed_usuario_rol_service_1.UsuarioRolSeed,
            seed_estado_service_1.EstadoSeed,
            seed_rango_service_1.RangoSeed,
            seed_recomendaciones_service_1.RecomendacionSeed,
            seed_recomendaciones_estado_service_1.RecomendacionEstadoSeed,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map