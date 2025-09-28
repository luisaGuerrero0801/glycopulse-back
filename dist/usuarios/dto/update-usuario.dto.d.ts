import { CreateUsuarioDto } from './create-usuario.dto';
declare const UpdateUsuarioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    nombresUsuario?: string;
    apellidosUsuario?: string;
    fechaNacimientoUsuario?: string;
    generoUsuario?: string;
    rhUsuario: string;
    correoUsuario?: string;
    contrasenaUsuario?: string;
    celularUsuario: string;
    ciudadUsuario?: string;
    paisUsuario?: string;
    idRol?: number;
    estado?: 'Activo' | 'Inactivo';
    idUsuarioResponsable?: number;
}
export {};
