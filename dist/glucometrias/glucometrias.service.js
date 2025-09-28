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
exports.GlucometriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const glucometria_entity_1 = require("./entities/glucometria.entity");
const locale_1 = require("date-fns/locale");
const date_fns_1 = require("date-fns");
const rango_glucometria_entity_1 = require("../rango-glucometrias/entities/rango-glucometria.entity");
let GlucometriasService = class GlucometriasService {
    constructor(usuario, glucometria, rango) {
        this.usuario = usuario;
        this.glucometria = glucometria;
        this.rango = rango;
    }
    async analizarGlucometria(nivel, momento) {
        const rango = await this.rango
            .createQueryBuilder('rango')
            .leftJoinAndSelect('rango.estado', 'estado')
            .leftJoinAndSelect('estado.recomendaciones', 'recomendacionesEstado')
            .leftJoinAndSelect('recomendacionesEstado.recomendacion', 'recomendacion')
            .where('rango.momento = :momento', { momento })
            .andWhere(':nivel BETWEEN rango.valorMinRango AND rango.valorMaxRango', {
            nivel,
        })
            .getOne();
        if (!rango) {
            throw new common_1.NotFoundException(`No se encontró rango para el nivel ${nivel} y momento ${momento}`);
        }
        return {
            rango,
            estado: rango.estado,
            recomendaciones: rango.estado.recomendaciones.map((re) => re.recomendacion),
        };
    }
    toResponseDto(glucometria, rango, estado, recomendaciones) {
        const { fecha } = this.formatGlucometriaDateTime(glucometria);
        const horaFormateada = (0, date_fns_1.format)(new Date(`1970-01-01T${glucometria.horaGlucometria}`), 'hh:mm a', { locale: locale_1.es });
        return {
            idGlucometria: glucometria.idGlucometria,
            fechaGlucometria: fecha,
            horaGlucometria: horaFormateada,
            nivelGlucometria: glucometria.nivelGlucometria,
            momento: glucometria.momento,
            usuario: {
                idUsuario: glucometria.usuario.idUsuario,
                nombres: glucometria.usuario.nombresUsuario,
                apellidos: glucometria.usuario.apellidosUsuario,
                correo: glucometria.usuario.correoUsuario,
                rol: {
                    idRol: glucometria.usuario.rol.idRol,
                    nombreRol: glucometria.usuario.rol.nombreRol,
                },
            },
            rango: {
                idRango: rango.idRango,
                nombreRango: rango.nombreRango,
                valorMinRango: rango.valorMinRango,
                valorMaxRango: rango.valorMaxRango,
                momento: rango.momento,
                color: rango.color,
            },
            estado: {
                idEstado: estado.idEstado,
                nombreEstado: estado.nombreEstado,
                descripcionEstado: estado.descripcionEstado,
            },
            recomendaciones: recomendaciones.map((r) => ({
                idRecomendacion: r.idRecomendacion,
                tipoRecomendacion: r.tipoRecomendacion,
                descripcionRecomendacion: r.descripcionRecomendacion,
            })),
        };
    }
    async create(createGlucometriaDto, userId) {
        const userIdNumber = Number(userId);
        if (isNaN(userIdNumber)) {
            throw new common_1.BadRequestException('El ID de usuario no es válido');
        }
        const usuario = await this.usuario.findOne({
            where: { idUsuario: userIdNumber },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (usuario.rol?.nombreRol !== 'Paciente') {
            throw new Error('Solo se pueden registrar glucometrías para usuarios con rol Paciente');
        }
        const { rango, estado, recomendaciones } = await this.analizarGlucometria(createGlucometriaDto.nivelGlucometria, createGlucometriaDto.momento);
        const nuevaGlucometria = this.glucometria.create({
            fechaGlucometria: createGlucometriaDto.fechaGlucometria,
            horaGlucometria: createGlucometriaDto.horaGlucometria,
            nivelGlucometria: createGlucometriaDto.nivelGlucometria,
            momento: createGlucometriaDto.momento,
            usuario,
            rango,
        });
        const glucoGuardada = await this.glucometria.save(nuevaGlucometria);
        return this.toResponseDto(glucoGuardada, rango, estado, recomendaciones);
    }
    async update(idGlucometria, updateGlucometriaDto, userId) {
        const userIdNumber = Number(userId);
        if (isNaN(userIdNumber)) {
            throw new common_1.BadRequestException('El ID de usuario no es válido');
        }
        const usuario = await this.usuario.findOne({
            where: { idUsuario: userIdNumber },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const glucometria = await this.glucometria.findOne({
            where: { idGlucometria: idGlucometria },
            relations: ['usuario'],
        });
        if (!glucometria)
            throw new common_1.NotFoundException('Glucometría no encontrada');
        const { rango, estado, recomendaciones } = await this.analizarGlucometria(updateGlucometriaDto.nivelGlucometria ?? glucometria.nivelGlucometria, updateGlucometriaDto.momento ?? glucometria.momento);
        Object.assign(glucometria, {
            fechaGlucometria: updateGlucometriaDto.fechaGlucometria ?? glucometria.fechaGlucometria,
            horaGlucometria: updateGlucometriaDto.horaGlucometria ?? glucometria.horaGlucometria,
            nivelGlucometria: updateGlucometriaDto.nivelGlucometria ?? glucometria.nivelGlucometria,
            momento: updateGlucometriaDto.momento ?? glucometria.momento,
            usuario,
            rango,
        });
        const glucometriaActualizada = await this.glucometria.save(glucometria);
        return this.toResponseDto(glucometriaActualizada, rango, estado, recomendaciones);
    }
    async remove(idGlucometria) {
        const glucometriaBus = await this.glucometria.findOneBy({ idGlucometria });
        if (!glucometriaBus) {
            throw new common_1.NotFoundException('Esta no Glucometria existe');
        }
        await this.glucometria.remove(glucometriaBus);
        return { message: 'Glucometria eliminada correctamente' };
    }
    async findAllByUser(userId, filters) {
        const userIdNumber = Number(userId);
        if (isNaN(userIdNumber)) {
            throw new common_1.BadRequestException('El ID de usuario no es válido');
        }
        let query = this.glucometria
            .createQueryBuilder('gluco')
            .leftJoinAndSelect('gluco.usuario', 'usuario')
            .leftJoinAndSelect('usuario.rol', 'rol')
            .leftJoinAndSelect('gluco.rango', 'rango')
            .leftJoinAndSelect('rango.estado', 'estado')
            .leftJoinAndSelect('estado.recomendaciones', 'recomendacionesEstado')
            .leftJoinAndSelect('recomendacionesEstado.recomendacion', 'recomendacion')
            .where('usuario.idUsuario = :userId', { userId: userIdNumber });
        if (filters?.fechaGlucometria) {
            query = query.andWhere('gluco.fechaGlucometria = :fecha', {
                fecha: filters.fechaGlucometria,
            });
        }
        if (filters?.rangoGlucometria) {
            query = query.andWhere('rango.nombreRango = :rango', {
                rango: filters.rangoGlucometria,
            });
        }
        if (filters?.orderFecha) {
            query.orderBy('gluco.fechaGlucometria', filters.orderFecha);
        }
        else if (filters?.orderNivel) {
            query.orderBy('gluco.nivelGlucometria', filters.orderNivel);
        }
        else {
            query.orderBy('gluco.fechaGlucometria', 'DESC');
        }
        const glucometrias = await query.getMany();
        return glucometrias.map((g) => this.toResponseDto(g, g.rango, g.rango.estado, g.rango.estado.recomendaciones.map((re) => re.recomendacion)));
    }
    async findOneById(id) {
        const glucometria = await this.glucometria
            .createQueryBuilder('gluco')
            .leftJoinAndSelect('gluco.usuario', 'usuario')
            .leftJoinAndSelect('usuario.rol', 'rol')
            .leftJoinAndSelect('gluco.rango', 'rango')
            .leftJoinAndSelect('rango.estado', 'estado')
            .leftJoinAndSelect('estado.recomendaciones', 'recomendacionesEstado')
            .leftJoinAndSelect('recomendacionesEstado.recomendacion', 'recomendacion')
            .where('gluco.idGlucometria = :id', { id })
            .getOne();
        if (!glucometria) {
            throw new common_1.NotFoundException('Glucometría no encontrada');
        }
        return this.toResponseDto(glucometria, glucometria.rango, glucometria.rango.estado, glucometria.rango.estado.recomendaciones.map((re) => re.recomendacion));
    }
    async findLastByUser(userId) {
        const userIdNumber = Number(userId);
        if (isNaN(userIdNumber)) {
            throw new common_1.BadRequestException('El ID de usuario no es válido');
        }
        const ultimaGlucometria = await this.glucometria
            .createQueryBuilder('gluco')
            .where('gluco.usuario = :userId', { userId: userIdNumber })
            .orderBy('gluco.fechaGlucometria', 'DESC')
            .addOrderBy('gluco.horaGlucometria', 'DESC')
            .getOne();
        if (!ultimaGlucometria) {
            throw new common_1.NotFoundException('No se encontró ninguna glucometría para este usuario');
        }
        const { fecha } = this.formatGlucometriaDateTime(ultimaGlucometria);
        const horaFormateada = (0, date_fns_1.format)(new Date(`1970-01-01T${ultimaGlucometria.horaGlucometria}`), 'hh:mm aaaa', { locale: locale_1.es });
        return {
            fecha: fecha,
            hora: horaFormateada,
        };
    }
    async getNombresRangosUnicos() {
        const rangos = await this.rango
            .createQueryBuilder('rango')
            .select('DISTINCT rango.nombreRango', 'nombreRango')
            .orderBy('rango.nombreRango', 'ASC')
            .getRawMany();
        return rangos.map((r) => r.nombreRango);
    }
    formatearFecha(fecha, formato = 'completo', formatoPersonalizado) {
        let fechaLocal;
        if (typeof fecha === 'string') {
            const [year, month, day] = fecha.split('-').map(Number);
            fechaLocal = new Date(year, month - 1, day);
        }
        else {
            const year = fecha.getFullYear();
            const month = fecha.getMonth();
            const day = fecha.getDate();
            fechaLocal = new Date(year, month, day);
        }
        switch (formato) {
            case 'completo':
                return (0, date_fns_1.format)(fechaLocal, 'EEEE dd MMMM yyyy', { locale: locale_1.es });
            case 'corto':
                return (0, date_fns_1.format)(fechaLocal, 'dd MMM yyyy', { locale: locale_1.es });
            case 'input':
                const year = fechaLocal.getFullYear();
                const month = String(fechaLocal.getMonth() + 1).padStart(2, '0');
                const day = String(fechaLocal.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            case 'personalizado':
                if (!formatoPersonalizado)
                    throw new Error('Debe proporcionar un formato personalizado');
                return (0, date_fns_1.format)(fechaLocal, formatoPersonalizado, { locale: locale_1.es });
            default:
                return (0, date_fns_1.format)(fechaLocal, 'EEEE dd MMMM yyyy', { locale: locale_1.es });
        }
    }
    formatGlucometriaDateTime(glucometria) {
        const fechaFormateada = this.formatearFecha(glucometria.fechaGlucometria, 'personalizado', 'eee dd MMM yyyy');
        return { fecha: fechaFormateada };
    }
};
exports.GlucometriasService = GlucometriasService;
exports.GlucometriasService = GlucometriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_2.InjectRepository)(glucometria_entity_1.Glucometria)),
    __param(2, (0, typeorm_2.InjectRepository)(rango_glucometria_entity_1.RangoGlucometria)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], GlucometriasService);
//# sourceMappingURL=glucometrias.service.js.map