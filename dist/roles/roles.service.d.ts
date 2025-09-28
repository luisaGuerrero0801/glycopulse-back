import { CreateRolDto } from './dto/create-role.dto';
import { UpdateRolDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
export declare class RolesService {
    private readonly roles;
    constructor(roles: Repository<Rol>);
    create(createRolDto: CreateRolDto): Promise<Rol>;
    findAll(): Promise<Rol[]>;
    findOne(idRol: number): Promise<Rol>;
    update(idRol: number, updateRolDto: UpdateRolDto): Promise<import("typeorm").UpdateResult>;
    remove(idRol: number): Promise<import("typeorm").DeleteResult>;
}
