import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import { MailerService } from 'src/mail/mailer.service';
export declare class UsuariosService {
    private readonly usuarios;
    private readonly roles;
    private readonly mailerService;
    constructor(usuarios: Repository<Usuario>, roles: Repository<Rol>, mailerService: MailerService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    countByRolAndRh(): Promise<any[]>;
    findOneByEmail(correoUsuario: string): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    buscarDoctores(): Promise<Usuario[]>;
    findOne(idUsuario: number): Promise<Usuario>;
    getBasicInfo(idUsuario: number): Promise<Usuario>;
    findPacientesByDoctor(idDoctor: number): Promise<Usuario[]>;
    update(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    remove(idUsuario: number): Promise<{
        message: string;
    }>;
    cambiarEstado(idUsuario: number, activo: boolean): Promise<Usuario>;
    findOneById(id: number): Promise<Usuario | null>;
    save(usuario: Usuario): Promise<Usuario>;
    asignarDoctor(idPaciente: number, idDoctor: number): Promise<Usuario>;
}
