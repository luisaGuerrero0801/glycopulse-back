import { CreateRolDto } from './create-role.dto';
declare const UpdateRolDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRolDto>>;
export declare class UpdateRolDto extends UpdateRolDto_base {
    nombreRol?: string;
}
export {};
