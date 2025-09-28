import { Rol } from 'src/roles/entities/rol.entity';
import { Glucometria } from 'src/glucometrias/entities/glucometria.entity';
import { Receta } from 'src/recetas/entities/receta.entity';
export declare class Usuario {
    idUsuario: number;
    nombresUsuario: string;
    apellidosUsuario: string;
    fechaNacimientoUsuario: Date;
    generoUsuario: string;
    rhUsuario: string;
    correoUsuario: string;
    contrasenaUsuario: string;
    celularUsuario: string;
    ciudadUsuario: string;
    paisUsuario: string;
    estado: 'Activo' | 'Inactivo';
    verificado: boolean;
    idUsuarioResponsable?: number;
    rol: Rol;
    glucometrias: Glucometria[];
    recetas: Receta[];
}
