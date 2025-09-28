"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const index_seed_1 = require("./index.seed");
let SeedService = class SeedService {
    constructor(usuarioRolSeed, estadoSeed, rangoSeed, recomendacionSeed, recomendacionEstadoSeed) {
        this.usuarioRolSeed = usuarioRolSeed;
        this.estadoSeed = estadoSeed;
        this.rangoSeed = rangoSeed;
        this.recomendacionSeed = recomendacionSeed;
        this.recomendacionEstadoSeed = recomendacionEstadoSeed;
    }
    async onModuleInit() {
        console.log('🌱 Ejecutando seeders...');
        await this.runSeeds();
    }
    async runSeeds() {
        await this.usuarioRolSeed.run();
        await this.estadoSeed.run();
        await this.rangoSeed.run();
        await this.recomendacionSeed.run();
        await this.recomendacionEstadoSeed.run();
        console.log('✅ Todos los seeders ejecutados correctamente');
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [index_seed_1.UsuarioRolSeed,
        index_seed_1.EstadoSeed,
        index_seed_1.RangoSeed,
        index_seed_1.RecomendacionSeed,
        index_seed_1.RecomendacionEstadoSeed])
], SeedService);
//# sourceMappingURL=seed.service.js.map