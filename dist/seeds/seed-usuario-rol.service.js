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
exports.UsuarioRolSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rol_entity_1 = require("../roles/entities/rol.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const bcryptjs = require("bcryptjs");
let UsuarioRolSeed = class UsuarioRolSeed {
    constructor(roleRepo, userRepo) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
    }
    async run() {
        const roles = ['Paciente', 'Admin', 'Doctor'];
        for (const nombre of roles) {
            const exists = await this.roleRepo.findOne({
                where: { nombreRol: nombre },
            });
            if (!exists) {
                await this.roleRepo.save(this.roleRepo.create({ nombreRol: nombre }));
            }
        }
        const adminRole = await this.roleRepo.findOne({
            where: { nombreRol: 'Admin' },
        });
        if (!adminRole) {
            console.error(' Error: El rol Admin no existe, no se puede crear el usuario administrador.');
            return;
        }
        const adminEmail = 'glycopulse@gmail.com';
        const adminExists = await this.userRepo.findOne({
            where: { correoUsuario: adminEmail },
        });
        if (!adminExists) {
            const hashedPassword = await bcryptjs.hash('glycopulse123', 10);
            const adminUser = this.userRepo.create({
                nombresUsuario: 'Admin',
                apellidosUsuario: 'Principal',
                fechaNacimientoUsuario: '2000-04-11',
                generoUsuario: 'Femenino',
                rhUsuario: 'O+',
                correoUsuario: adminEmail,
                contrasenaUsuario: hashedPassword,
                celularUsuario: '3112065084',
                ciudadUsuario: 'Bogotá',
                paisUsuario: 'Colombia',
                estado: 'Activo',
                verificado: true,
                rol: { idRol: adminRole.idRol },
                idUsuarioResponsable: null,
            });
            await this.userRepo.save(adminUser);
            console.log(`Usuario administrador creado: ${adminEmail}`);
        }
        else {
            console.log(`Usuario administrador ya existe: ${adminEmail}`);
        }
    }
};
exports.UsuarioRolSeed = UsuarioRolSeed;
exports.UsuarioRolSeed = UsuarioRolSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuarioRolSeed);
//# sourceMappingURL=seed-usuario-rol.service.js.map