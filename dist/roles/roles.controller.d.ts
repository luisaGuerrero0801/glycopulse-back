import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-role.dto';
import { UpdateRolDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRolDto: CreateRolDto): Promise<import("./entities/rol.entity").Rol>;
    findAll(): Promise<import("./entities/rol.entity").Rol[]>;
    findOne(idRol: number): Promise<import("./entities/rol.entity").Rol>;
    update(idRol: number, updateRolDto: UpdateRolDto): Promise<import("typeorm").UpdateResult>;
    remove(idRol: number): Promise<import("typeorm").DeleteResult>;
}
