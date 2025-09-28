import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { MomentoGlucometria } from '../enums/momento-glucometria.enum';
export declare class Glucometria {
    idGlucometria: number;
    fechaGlucometria: Date;
    horaGlucometria: string;
    nivelGlucometria: number;
    momento: MomentoGlucometria;
    usuario: Usuario;
    rango: RangoGlucometria;
}
