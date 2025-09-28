import { MomentoGlucometria } from 'src/glucometrias/enums/momento-glucometria.enum';
export declare class CreateRangoGlucometriaDto {
    nombreRango: string;
    valorMinRango: number;
    valorMaxRango: number;
    idEstado: number;
    momento: MomentoGlucometria;
}
