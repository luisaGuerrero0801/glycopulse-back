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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estado_glucometria_entity_1 = require("../estado-glucometria/entities/estado-glucometria.entity");
const rango_glucometria_entity_1 = require("../rango-glucometrias/entities/rango-glucometria.entity");
const momento_glucometria_enum_1 = require("../glucometrias/enums/momento-glucometria.enum");
let RangoSeed = class RangoSeed {
    constructor(rangoRepo, estadoRepo) {
        this.rangoRepo = rangoRepo;
        this.estadoRepo = estadoRepo;
    }
    async run() {
        const estados = await this.estadoRepo.find();
        const rangos = [
            {
                nombre: 'Critica Bajo',
                min: 30,
                max: 54,
                estado: 'Hipoglucemia Critica Ayunas',
                momento: momento_glucometria_enum_1.MomentoGlucometria.AYUNAS,
                color: '#ED0000',
            },
            {
                nombre: 'Muy Bajo',
                min: 55,
                max: 69,
                estado: 'Hipoglucemia Ayunas',
                momento: momento_glucometria_enum_1.MomentoGlucometria.AYUNAS,
                color: '#f25f51ff',
            },
            {
                nombre: 'Bajo',
                min: 70,
                max: 79,
                estado: 'Bajo Ayunas',
                momento: momento_glucometria_enum_1.MomentoGlucometria.AYUNAS,
                color: '#ff8c8cff',
            },
            {
                nombre: 'Normal',
                min: 80,
                max: 130,
                estado: 'Óptimo Ayunas',
                momento: momento_glucometria_enum_1.MomentoGlucometria.AYUNAS,
                color: '#01763cff',
            },
            {
                nombre: 'Alto',
                min: 131,
                max: 180,
                estado: 'Alto Ayunas',
                momento: momento_glucometria_enum_1.MomentoGlucometria.AYUNAS,
                color: '#ffe100ff',
            },
            {
                nombre: 'Muy Alto',
                min: 181,
                max: 399,
                estado: 'Hiperglucemia Ayunas',
                momento: momento_glucometria_enum_1.MomentoGlucometria.AYUNAS,
                color: '#f58f00ff',
            },
            {
                nombre: 'Critica Alto',
                min: 400,
                max: 700,
                estado: 'Hiperglucemia Critica Ayunas',
                momento: momento_glucometria_enum_1.MomentoGlucometria.AYUNAS,
                color: '#fe5000ff',
            },
            {
                nombre: 'Critica Bajo',
                min: 30,
                max: 54,
                estado: 'Hipoglucemia Critica Preprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.PREPRANDIAL,
                color: '#ED0000',
            },
            {
                nombre: 'Muy Bajo',
                min: 55,
                max: 69,
                estado: 'Hipoglucemia Preprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.PREPRANDIAL,
                color: '#f25f51ff',
            },
            {
                nombre: 'Bajo',
                min: 70,
                max: 79,
                estado: 'Bajo Preprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.PREPRANDIAL,
                color: '#ff8c8cff',
            },
            {
                nombre: 'Normal',
                min: 80,
                max: 130,
                estado: 'Óptimo Preprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.PREPRANDIAL,
                color: '#01763cff',
            },
            {
                nombre: 'Alto',
                min: 131,
                max: 180,
                estado: 'Alto Preprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.PREPRANDIAL,
                color: '#ffe100ff',
            },
            {
                nombre: 'Muy Alto',
                min: 181,
                max: 399,
                estado: 'Hiperglucemia Preprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.PREPRANDIAL,
                color: '#f58f00ff',
            },
            {
                nombre: 'Critica Alto',
                min: 400,
                max: 700,
                estado: 'Hiperglucemia Critica Preprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.PREPRANDIAL,
                color: '#fe5000ff',
            },
            {
                nombre: 'Critica Bajo',
                min: 30,
                max: 54,
                estado: 'Hipoglucemia Critica Postprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.POSTPRANDIAL,
                color: '#ED0000',
            },
            {
                nombre: 'Muy Bajo',
                min: 55,
                max: 69,
                estado: 'Hipoglucemia Postprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.POSTPRANDIAL,
                color: '#f25f51ff',
            },
            {
                nombre: 'Bajo',
                min: 70,
                max: 79,
                estado: 'Bajo Postprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.POSTPRANDIAL,
                color: '#ff8c8cff',
            },
            {
                nombre: 'Normal',
                min: 80,
                max: 180,
                estado: 'Óptimo Postprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.POSTPRANDIAL,
                color: '#01763cff',
            },
            {
                nombre: 'Alto',
                min: 181,
                max: 250,
                estado: 'Alto Postprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.POSTPRANDIAL,
                color: '#ffe100ff',
            },
            {
                nombre: 'Muy Alto',
                min: 251,
                max: 399,
                estado: 'Hiperglucemia Postprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.POSTPRANDIAL,
                color: '#f58f00ff',
            },
            {
                nombre: 'Critica Alto',
                min: 400,
                max: 700,
                estado: 'Hiperglucemia Critica Postprandial',
                momento: momento_glucometria_enum_1.MomentoGlucometria.POSTPRANDIAL,
                color: '#fe5000ff',
            },
            {
                nombre: 'Critica Bajo',
                min: 30,
                max: 54,
                estado: 'Hipoglucemia Critica',
                momento: momento_glucometria_enum_1.MomentoGlucometria.OTRO,
                color: '#ED0000',
            },
            {
                nombre: 'Muy Bajo',
                min: 55,
                max: 69,
                estado: 'Hipoglucemia',
                momento: momento_glucometria_enum_1.MomentoGlucometria.OTRO,
                color: '#f25f51ff',
            },
            {
                nombre: 'Bajo',
                min: 70,
                max: 79,
                estado: 'Bajo',
                momento: momento_glucometria_enum_1.MomentoGlucometria.OTRO,
                color: '#ff8c8cff',
            },
            {
                nombre: 'Normal',
                min: 80,
                max: 130,
                estado: 'Óptimo',
                momento: momento_glucometria_enum_1.MomentoGlucometria.OTRO,
                color: '#01763cff',
            },
            {
                nombre: 'Alto',
                min: 131,
                max: 180,
                estado: 'Alto',
                momento: momento_glucometria_enum_1.MomentoGlucometria.OTRO,
                color: '#ffe100ff',
            },
            {
                nombre: 'Muy Alto',
                min: 181,
                max: 399,
                estado: 'Hiperglucemia',
                momento: momento_glucometria_enum_1.MomentoGlucometria.OTRO,
                color: '#f58f00ff',
            },
            {
                nombre: 'Critica Alto',
                min: 400,
                max: 700,
                estado: 'Hiperglucemia Critica',
                momento: momento_glucometria_enum_1.MomentoGlucometria.OTRO,
                color: '#fe5000ff',
            },
        ];
        let contadorRangos = 0;
        let estadosNoEncontrados = 0;
        for (const r of rangos) {
            const estado = estados.find((e) => e.nombreEstado === r.estado);
            if (!estado) {
                console.log(`❌ No se encontró el estado: "${r.estado}"`);
                estadosNoEncontrados++;
                continue;
            }
            const existe = await this.rangoRepo.findOne({
                where: { nombreRango: r.nombre, momento: r.momento },
            });
            if (!existe) {
                await this.rangoRepo.save(this.rangoRepo.create({
                    nombreRango: r.nombre,
                    valorMinRango: r.min,
                    valorMaxRango: r.max,
                    estado,
                    momento: r.momento,
                    color: r.color,
                }));
                contadorRangos++;
            }
        }
        console.log(`✅ ${contadorRangos} rangos insertados correctamente`);
        if (estadosNoEncontrados > 0) {
            console.log(`⚠️  ${estadosNoEncontrados} estados no encontrados en RangoSeed`);
        }
    }
};
exports.RangoSeed = RangoSeed;
exports.RangoSeed = RangoSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rango_glucometria_entity_1.RangoGlucometria)),
    __param(1, (0, typeorm_1.InjectRepository)(estado_glucometria_entity_1.EstadoGlucometria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RangoSeed);
//# sourceMappingURL=seed-rango.service.js.map