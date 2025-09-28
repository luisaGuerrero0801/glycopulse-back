import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { Glucometria } from 'src/glucometrias/entities/glucometria.entity';
import { MomentoGlucometria } from 'src/glucometrias/enums/momento-glucometria.enum';
export declare class RangoGlucometria {
    idRango: number;
    nombreRango: string;
    valorMinRango: number;
    valorMaxRango: number;
    momento: MomentoGlucometria;
    color: string;
    estado: EstadoGlucometria;
    glucometrias: Glucometria[];
}
