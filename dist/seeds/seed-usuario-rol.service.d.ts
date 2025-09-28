import { Repository } from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
export declare class UsuarioRolSeed {
    private roleRepo;
    private userRepo;
    constructor(roleRepo: Repository<Rol>, userRepo: Repository<Usuario>);
    run(): Promise<void>;
}
