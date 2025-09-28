"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlucometriasModule = void 0;
const common_1 = require("@nestjs/common");
const glucometrias_service_1 = require("./glucometrias.service");
const glucometrias_controller_1 = require("./glucometrias.controller");
const typeorm_1 = require("@nestjs/typeorm");
const glucometria_entity_1 = require("./entities/glucometria.entity");
const typeorm_2 = require("typeorm");
const usuarios_module_1 = require("../usuarios/usuarios.module");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const rango_glucometria_entity_1 = require("../rango-glucometrias/entities/rango-glucometria.entity");
const rango_glucometrias_module_1 = require("../rango-glucometrias/rango-glucometrias.module");
const recomendaciones_estado_module_1 = require("../recomendaciones-estado/recomendaciones-estado.module");
const recomendaciones_estado_entity_1 = require("../recomendaciones-estado/entities/recomendaciones-estado.entity");
const auth_guard_1 = require("../auth/guard/auth.guard");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let GlucometriasModule = class GlucometriasModule {
};
exports.GlucometriasModule = GlucometriasModule;
exports.GlucometriasModule = GlucometriasModule = __decorate([
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
                glucometria_entity_1.Glucometria,
                usuario_entity_1.Usuario,
                rango_glucometria_entity_1.RangoGlucometria,
                recomendaciones_estado_entity_1.RecomendacionesEstado,
            ]),
            typeorm_2.Repository,
            usuarios_module_1.UsuariosModule,
            rango_glucometrias_module_1.RangoGlucometriasModule,
            recomendaciones_estado_module_1.RecomendacionesEstadoModule,
            config_1.ConfigModule,
        ],
        controllers: [glucometrias_controller_1.GlucometriasController],
        providers: [glucometrias_service_1.GlucometriasService, auth_guard_1.AuthGuard],
        exports: [glucometrias_service_1.GlucometriasService, typeorm_1.TypeOrmModule],
    })
], GlucometriasModule);
//# sourceMappingURL=glucometrias.module.js.map