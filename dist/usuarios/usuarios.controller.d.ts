import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    getCountByRolAndRh(): Promise<any[]>;
    findAll(): Promise<import("./entities/usuario.entity").Usuario[]>;
    buscarDoctores(): Promise<import("./entities/usuario.entity").Usuario[]>;
    findOne(idUsuario: number): Promise<import("./entities/usuario.entity").Usuario>;
    getBasicInfo(idUsuario: number): Promise<import("./entities/usuario.entity").Usuario>;
    findPacientesByDoctor(idDoctor: number): Promise<import("./entities/usuario.entity").Usuario[]>;
    update(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    remove(idUsuario: number): Promise<{
        message: string;
    }>;
    cambiarEstado(idUsuario: number, activo: boolean): Promise<import("./entities/usuario.entity").Usuario>;
    asignarDoctor(idPaciente: number, idDoctor: number): Promise<import("./entities/usuario.entity").Usuario>;
}
