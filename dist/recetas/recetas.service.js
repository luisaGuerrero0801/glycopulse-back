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
exports.RecetasService = void 0;
const common_1 = require("@nestjs/common");
const receta_entity_1 = require("./entities/receta.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const ingrediente_entity_1 = require("../ingredientes/entities/ingrediente.entity");
const ingredientes_receta_entity_1 = require("../ingredientes-receta/entities/ingredientes-receta.entity");
const pasos_receta_entity_1 = require("../pasos-recetas/entities/pasos-receta.entity");
let RecetasService = class RecetasService {
    constructor(recetas, usuarios, ingredienteRepo, ingredientesRecetaRepo, pasosRecetaRepo) {
        this.recetas = recetas;
        this.usuarios = usuarios;
        this.ingredienteRepo = ingredienteRepo;
        this.ingredientesRecetaRepo = ingredientesRecetaRepo;
        this.pasosRecetaRepo = pasosRecetaRepo;
    }
    async envioIngredientes(receta, ingredientesDto, isUpdate = false) {
        if (!ingredientesDto || ingredientesDto.length === 0)
            return;
        if (isUpdate) {
            await this.ingredientesRecetaRepo.delete({
                receta: { idReceta: receta.idReceta },
            });
        }
        for (const ingDto of ingredientesDto) {
            if (!ingDto.nombreIngrediente) {
                throw new common_1.BadRequestException('El nombre del ingrediente es obligatorio');
            }
            let ingrediente = await this.ingredienteRepo.findOne({
                where: { nombreIngrediente: ingDto.nombreIngrediente },
            });
            if (!ingrediente) {
                ingrediente = await this.ingredienteRepo.save(this.ingredienteRepo.create({
                    nombreIngrediente: ingDto.nombreIngrediente,
                }));
            }
            const ingredienteReceta = this.ingredientesRecetaRepo.create({
                cantidadIngredienteReceta: ingDto.cantidadIngredienteReceta ?? 0,
                medidaIngredienteReceta: ingDto.medidaIngredienteReceta ?? '',
                ingrediente,
                receta,
            });
            await this.ingredientesRecetaRepo.save(ingredienteReceta);
        }
    }
    async envioPasos(receta, pasosDto, isUpdate = false) {
        if (!pasosDto || pasosDto.length === 0)
            return;
        if (isUpdate) {
            await this.pasosRecetaRepo.delete({
                receta: { idReceta: receta.idReceta },
            });
        }
        for (const paso of pasosDto) {
            const pasoEntity = this.pasosRecetaRepo.create({
                ordenPasoReceta: paso.ordenPasoReceta,
                descripcionPasoReceta: paso.descripcionPasoReceta,
                receta,
            });
            await this.pasosRecetaRepo.save(pasoEntity);
        }
    }
    async create(createRecetaDto, pacienteId) {
        if (isNaN(pacienteId)) {
            throw new common_1.BadRequestException('El ID de paciente no es válido');
        }
        const usuario = await this.usuarios.findOne({
            where: { idUsuario: pacienteId },
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Paciente no encontrado');
        }
        const receta = this.recetas.create({
            nombreReceta: createRecetaDto.nombreReceta,
            descripcionReceta: createRecetaDto.descripcionReceta,
            porcionesReceta: createRecetaDto.porcionesReceta,
            caloriasReceta: createRecetaDto.caloriasReceta,
            tiempoReceta: createRecetaDto.tiempoReceta,
            imagenReceta: createRecetaDto.imagenReceta,
            nivelReceta: createRecetaDto.nivelReceta,
            categoriaReceta: createRecetaDto.categoriaReceta,
            usuario,
        });
        const savedReceta = await this.recetas.save(receta);
        await this.envioIngredientes(savedReceta, createRecetaDto.ingredientes);
        await this.envioPasos(savedReceta, createRecetaDto.pasos);
        return await this.recetas.findOne({
            where: { idReceta: savedReceta.idReceta },
            relations: [
                'usuario',
                'ingredientes',
                'ingredientes.ingrediente',
                'pasos',
            ],
        });
    }
    async findAll() {
        return await this.recetas.find({
            relations: [
                'usuario',
                'ingredientes',
                'ingredientes.ingrediente',
                'pasos',
            ],
        });
    }
    async findOne(idReceta) {
        const receta = await this.recetas.findOne({
            where: { idReceta },
            relations: [
                'usuario',
                'ingredientes',
                'ingredientes.ingrediente',
                'pasos',
            ],
        });
        if (!receta)
            throw new common_1.NotFoundException('Receta no encontrada');
        return receta;
    }
    async findRecetaByPaciente(idUsuario) {
        const recetas = await this.recetas.find({
            where: { usuario: { idUsuario } },
            relations: [
                'usuario',
                'ingredientes',
                'ingredientes.ingrediente',
                'pasos',
            ],
        });
        if (!recetas || recetas.length === 0) {
            throw new common_1.NotFoundException(`No se encontraron recetas para el usuario con ID ${idUsuario}`);
        }
        return recetas;
    }
    async update(idReceta, updateRecetaDto, pacienteId) {
        if (isNaN(pacienteId)) {
            throw new common_1.BadRequestException('El ID de paciente no es válido');
        }
        const receta = await this.recetas.findOne({
            where: { idReceta, usuario: { idUsuario: pacienteId } },
            relations: ['ingredientes', 'ingredientes.ingrediente'],
        });
        if (!receta)
            throw new common_1.NotFoundException('Receta no encontrada');
        Object.assign(receta, {
            nombreReceta: updateRecetaDto.nombreReceta ?? receta.nombreReceta,
            descripcionReceta: updateRecetaDto.descripcionReceta ?? receta.descripcionReceta,
            porcionesReceta: updateRecetaDto.porcionesReceta ?? receta.porcionesReceta,
            caloriasReceta: updateRecetaDto.caloriasReceta ?? receta.caloriasReceta,
            tiempoReceta: updateRecetaDto.tiempoReceta ?? receta.tiempoReceta,
            imagenReceta: updateRecetaDto.imagenReceta ?? receta.imagenReceta,
            nivelReceta: updateRecetaDto.nivelReceta ?? receta.nivelReceta,
            categoriaReceta: updateRecetaDto.categoriaReceta ?? receta.categoriaReceta,
        });
        const savedReceta = await this.recetas.save(receta);
        if (updateRecetaDto.ingredientes) {
            await this.envioIngredientes(savedReceta, updateRecetaDto.ingredientes, true);
        }
        if (updateRecetaDto.pasos) {
            await this.envioPasos(savedReceta, updateRecetaDto.pasos, true);
        }
        return await this.recetas.findOne({
            where: { idReceta: savedReceta.idReceta },
            relations: ['ingredientes', 'ingredientes.ingrediente', 'pasos'],
        });
    }
    async remove(idReceta) {
        const receta = await this.recetas.findOneBy({ idReceta });
        if (!receta) {
            throw new common_1.NotFoundException('Esta receta no existe');
        }
        await this.recetas.remove(receta);
        return { message: 'Receta eliminada correctamente' };
    }
};
exports.RecetasService = RecetasService;
exports.RecetasService = RecetasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(receta_entity_1.Receta)),
    __param(1, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_2.InjectRepository)(ingrediente_entity_1.Ingrediente)),
    __param(3, (0, typeorm_2.InjectRepository)(ingredientes_receta_entity_1.IngredientesReceta)),
    __param(4, (0, typeorm_2.InjectRepository)(pasos_receta_entity_1.PasosReceta)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], RecetasService);
//# sourceMappingURL=recetas.service.js.map