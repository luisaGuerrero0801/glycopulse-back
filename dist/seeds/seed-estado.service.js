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
exports.EstadoSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estado_glucometria_entity_1 = require("../estado-glucometria/entities/estado-glucometria.entity");
let EstadoSeed = class EstadoSeed {
    constructor(estadoRepo) {
        this.estadoRepo = estadoRepo;
    }
    async run() {
        const estados = [
            {
                nombreEstado: 'Hipoglucemia Critica Ayunas',
                descripcionEstado: 'Glucosa <54 mg/dL en ayunas',
            },
            {
                nombreEstado: 'Hipoglucemia Ayunas',
                descripcionEstado: 'Glucosa 54–69 mg/dL en ayunas',
            },
            {
                nombreEstado: 'Bajo Ayunas',
                descripcionEstado: 'Glucosa 70–79 mg/dL en ayunas',
            },
            {
                nombreEstado: 'Óptimo Ayunas',
                descripcionEstado: 'Glucosa 80–130 mg/dL en ayunas',
            },
            {
                nombreEstado: 'Alto Ayunas',
                descripcionEstado: 'Glucosa 131–180 mg/dL en ayunas',
            },
            {
                nombreEstado: 'Hiperglucemia Ayunas',
                descripcionEstado: 'Glucosa 181–399 mg/dL en ayunas',
            },
            {
                nombreEstado: 'Hiperglucemia Critica Ayunas',
                descripcionEstado: 'Glucosa ≥400 mg/dL en ayunas',
            },
            {
                nombreEstado: 'Hipoglucemia Critica Preprandial',
                descripcionEstado: 'Glucosa <54 mg/dL antes de comida',
            },
            {
                nombreEstado: 'Hipoglucemia Preprandial',
                descripcionEstado: 'Glucosa 54–69 mg/dL antes de comida',
            },
            {
                nombreEstado: 'Bajo Preprandial',
                descripcionEstado: 'Glucosa 70–79 mg/dL antes de comida',
            },
            {
                nombreEstado: 'Óptimo Preprandial',
                descripcionEstado: 'Glucosa 80–130 mg/dL antes de comida',
            },
            {
                nombreEstado: 'Alto Preprandial',
                descripcionEstado: 'Glucosa 131–180 mg/dL antes de comida',
            },
            {
                nombreEstado: 'Hiperglucemia Preprandial',
                descripcionEstado: 'Glucosa 181–399 mg/dL antes de comida',
            },
            {
                nombreEstado: 'Hiperglucemia Critica Preprandial',
                descripcionEstado: 'Glucosa ≥400 mg/dL antes de comida',
            },
            {
                nombreEstado: 'Hipoglucemia Critica Postprandial',
                descripcionEstado: 'Glucosa <54 mg/dL después de comida',
            },
            {
                nombreEstado: 'Hipoglucemia Postprandial',
                descripcionEstado: 'Glucosa 54–69 mg/dL después de comida',
            },
            {
                nombreEstado: 'Bajo Postprandial',
                descripcionEstado: 'Glucosa 70–79 mg/dL después de comida',
            },
            {
                nombreEstado: 'Óptimo Postprandial',
                descripcionEstado: 'Glucosa 80–180 mg/dL después de comida',
            },
            {
                nombreEstado: 'Alto Postprandial',
                descripcionEstado: 'Glucosa 181–250 mg/dL después de comida',
            },
            {
                nombreEstado: 'Hiperglucemia Postprandial',
                descripcionEstado: 'Glucosa 251–399 mg/dL después de comida',
            },
            {
                nombreEstado: 'Hiperglucemia Critica Postprandial',
                descripcionEstado: 'Glucosa ≥400 mg/dL después de comida',
            },
            {
                nombreEstado: 'Hipoglucemia Critica',
                descripcionEstado: 'Glucosa <54 mg/dL en otro momento',
            },
            {
                nombreEstado: 'Hipoglucemia',
                descripcionEstado: 'Glucosa 54–69 mg/dL en otro momento',
            },
            {
                nombreEstado: 'Bajo',
                descripcionEstado: 'Glucosa 70–79 mg/dL en otro momento',
            },
            {
                nombreEstado: 'Óptimo',
                descripcionEstado: 'Glucosa 80–130 mg/dL en otro momento',
            },
            {
                nombreEstado: 'Alto',
                descripcionEstado: 'Glucosa 131–180 mg/dL en otro momento',
            },
            {
                nombreEstado: 'Hiperglucemia',
                descripcionEstado: 'Glucosa 181–399 mg/dL en otro momento',
            },
            {
                nombreEstado: 'Hiperglucemia Critica',
                descripcionEstado: 'Glucosa ≥400 mg/dL en otro momento',
            },
        ];
        for (const estado of estados) {
            const existe = await this.estadoRepo.findOne({
                where: { nombreEstado: estado.nombreEstado },
            });
            if (!existe) {
                await this.estadoRepo.save(this.estadoRepo.create(estado));
            }
        }
        console.log('✅ Estados insertados correctamente');
    }
};
exports.EstadoSeed = EstadoSeed;
exports.EstadoSeed = EstadoSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estado_glucometria_entity_1.EstadoGlucometria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstadoSeed);
//# sourceMappingURL=seed-estado.service.js.map