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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("./entities/usuario.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const rol_entity_1 = require("../roles/entities/rol.entity");
const bcryptjs = require("bcryptjs");
const mailer_service_1 = require("../mail/mailer.service");
let UsuariosService = class UsuariosService {
    constructor(usuarios, roles, mailerService) {
        this.usuarios = usuarios;
        this.roles = roles;
        this.mailerService = mailerService;
    }
    async create(createUsuarioDto) {
        const rol = await this.roles.findOne({
            where: { idRol: createUsuarioDto.idRol },
        });
        if (!rol)
            throw new common_1.NotFoundException('Id de Rol no encontrado');
        const existingUser = await this.findOneByEmail(createUsuarioDto.correoUsuario);
        if (existingUser) {
            throw new common_1.ConflictException('Correo electrónico ya está en uso');
        }
        const fechaNacimiento = new Date(createUsuarioDto.fechaNacimientoUsuario);
        if (isNaN(fechaNacimiento.getTime())) {
            throw new common_1.BadRequestException('La fecha de nacimiento no es válida');
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(createUsuarioDto.contrasenaUsuario, salt);
        const usuario = this.usuarios.create({
            nombresUsuario: createUsuarioDto.nombresUsuario,
            apellidosUsuario: createUsuarioDto.apellidosUsuario,
            generoUsuario: createUsuarioDto.generoUsuario,
            rhUsuario: createUsuarioDto.rhUsuario,
            correoUsuario: createUsuarioDto.correoUsuario,
            contrasenaUsuario: hashedPassword,
            celularUsuario: createUsuarioDto.celularUsuario,
            ciudadUsuario: createUsuarioDto.ciudadUsuario,
            paisUsuario: createUsuarioDto.paisUsuario,
            fechaNacimientoUsuario: fechaNacimiento,
            estado: 'Activo',
            rol,
        });
        const usuarioGuardado = await this.usuarios.save(usuario);
        try {
            const token = await this.mailerService.generateVerificationToken(usuarioGuardado.idUsuario);
            await this.mailerService.sendVerificationEmail(usuarioGuardado.correoUsuario, token);
        }
        catch (error) {
            console.error('⚠️ No se pudo enviar el correo de verificación:', error.message);
        }
        return usuarioGuardado;
    }
    async countByRolAndRh() {
        return this.usuarios
            .createQueryBuilder('usuario')
            .select('rol.nombreRol', 'rol')
            .addSelect('usuario.rhUsuario', 'rh')
            .addSelect('COUNT(*)', 'cantidad')
            .innerJoin('usuario.rol', 'rol')
            .where('usuario.estado = :estado', { estado: 'Activo' })
            .groupBy('rol.nombreRol')
            .addGroupBy('usuario.rhUsuario')
            .getRawMany();
    }
    async findOneByEmail(correoUsuario) {
        return this.usuarios.findOne({
            where: { correoUsuario },
            relations: ['rol'],
        });
    }
    async findAll() {
        return await this.usuarios.find({ relations: ['rol'] });
    }
    async buscarDoctores() {
        return await this.usuarios.find({
            relations: ['rol'],
            where: {
                rol: { nombreRol: 'Doctor' },
                estado: 'Activo',
            },
            select: ['idUsuario', 'nombresUsuario', 'apellidosUsuario', 'estado'],
        });
    }
    async findOne(idUsuario) {
        return await this.usuarios.findOne({
            where: { idUsuario },
            relations: ['rol'],
        });
    }
    async getBasicInfo(idUsuario) {
        const usuario = await this.usuarios.findOne({
            where: { idUsuario },
            select: [
                'idUsuario',
                'nombresUsuario',
                'apellidosUsuario',
                'correoUsuario',
                'estado',
            ],
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
    async findPacientesByDoctor(idDoctor) {
        return this.usuarios.find({
            where: { idUsuarioResponsable: idDoctor },
            relations: ['rol'],
        });
    }
    async update(idUsuario, updateUsuarioDto) {
        const usuario = await this.usuarios.findOneBy({ idUsuario });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const existingUser = await this.findOneByEmail(updateUsuarioDto.correoUsuario);
        if (existingUser && existingUser.idUsuario !== idUsuario) {
            throw new common_1.ConflictException('El correo electrónico ya está en uso');
        }
        const fechaNacimiento = new Date(updateUsuarioDto.fechaNacimientoUsuario);
        if (isNaN(fechaNacimiento.getTime())) {
            throw new common_1.BadRequestException('La fecha de nacimiento no es válida');
        }
        if (updateUsuarioDto.contrasenaUsuario) {
            const salt = await bcryptjs.genSalt(10);
            updateUsuarioDto.contrasenaUsuario = await bcryptjs.hash(updateUsuarioDto.contrasenaUsuario, salt);
        }
        if (updateUsuarioDto.idRol) {
            const rol = await this.roles.findOne({
                where: { idRol: updateUsuarioDto.idRol },
            });
            if (!rol)
                throw new common_1.NotFoundException(`Id de rol no encontrado`);
            usuario.rol = rol;
        }
        Object.assign(usuario, updateUsuarioDto, {
            fechaNacimientoUsuario: fechaNacimiento,
        });
        return this.usuarios.save(usuario);
    }
    async remove(idUsuario) {
        const usuario = await this.usuarios.findOneBy({ idUsuario });
        if (!usuario) {
            throw new common_1.NotFoundException('Este usuario no existe');
        }
        await this.usuarios.delete(idUsuario);
        return { message: 'Usuario eliminado correctamente' };
    }
    async cambiarEstado(idUsuario, activo) {
        const usuario = await this.usuarios.findOneBy({ idUsuario });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        usuario.estado = activo ? 'Activo' : 'Inactivo';
        return await this.usuarios.save(usuario);
    }
    async findOneById(id) {
        return this.usuarios.findOne({
            where: { idUsuario: id },
            relations: ['rol'],
        });
    }
    async save(usuario) {
        return await this.usuarios.save(usuario);
    }
    async asignarDoctor(idPaciente, idDoctor) {
        const paciente = await this.usuarios.findOne({
            where: { idUsuario: idPaciente },
            relations: ['rol'],
        });
        const doctor = await this.usuarios.findOne({
            where: { idUsuario: idDoctor },
            relations: ['rol'],
        });
        if (!paciente) {
            throw new common_1.NotFoundException('Paciente no encontrado');
        }
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor no encontrado');
        }
        if (doctor.rol.nombreRol !== 'Doctor') {
            throw new common_1.BadRequestException(`El usuario con ID ${idDoctor} no tiene rol de Doctor`);
        }
        paciente.idUsuarioResponsable = doctor.idUsuario;
        return this.usuarios.save(paciente);
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_2.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        mailer_service_1.MailerService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map