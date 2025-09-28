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
exports.IngredientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ingrediente_entity_1 = require("./entities/ingrediente.entity");
const typeorm_2 = require("typeorm");
let IngredientesService = class IngredientesService {
    constructor(ingredienteRepo) {
        this.ingredienteRepo = ingredienteRepo;
    }
    async create(createIngredienteDto) {
        const exists = await this.ingredienteRepo.findOne({
            where: { nombreIngrediente: createIngredienteDto.nombreIngrediente },
        });
        if (exists) {
            throw new common_1.ConflictException(`El ingrediente "${createIngredienteDto.nombreIngrediente}" ya existe`);
        }
        const ingrediente = this.ingredienteRepo.create(createIngredienteDto);
        return this.ingredienteRepo.save(ingrediente);
    }
    async findAll() {
        return this.ingredienteRepo.find({ relations: ['recetas'] });
    }
    async findOne(idIngrediente) {
        const ingrediente = await this.ingredienteRepo.findOne({
            where: { idIngrediente: idIngrediente },
            relations: ['recetas'],
        });
        if (!ingrediente)
            throw new common_1.NotFoundException('Ingrediente no encontrado');
        return ingrediente;
    }
    async update(idIngrediente, updateIngredienteDto) {
        const ingrediente = await this.findOne(idIngrediente);
        if (updateIngredienteDto.nombreIngrediente) {
            const exists = await this.ingredienteRepo.findOne({
                where: { nombreIngrediente: updateIngredienteDto.nombreIngrediente },
            });
            if (exists && exists.idIngrediente !== idIngrediente) {
                throw new common_1.ConflictException(`El ingrediente "${updateIngredienteDto.nombreIngrediente}" ya existe`);
            }
        }
        Object.assign(ingrediente, updateIngredienteDto);
        return this.ingredienteRepo.save(ingrediente);
    }
    async remove(idIngrediente) {
        const ingrediente = await this.findOne(idIngrediente);
        if (!ingrediente) {
            throw new common_1.HttpException('Este Ingrediente No existe', common_1.HttpStatus.OK);
        }
        await this.ingredienteRepo.remove(ingrediente);
        throw new common_1.HttpException('Ingrediente eliminado correctamente', common_1.HttpStatus.OK);
    }
};
exports.IngredientesService = IngredientesService;
exports.IngredientesService = IngredientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ingrediente_entity_1.Ingrediente)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IngredientesService);
//# sourceMappingURL=ingredientes.service.js.map