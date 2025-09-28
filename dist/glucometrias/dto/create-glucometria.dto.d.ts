import { MomentoGlucometria } from '../enums/momento-glucometria.enum';
export declare class CreateGlucometriaDto {
    fechaGlucometria: Date;
    horaGlucometria: string;
    nivelGlucometria: number;
    idUsuario: number;
    momento: MomentoGlucometria;
}
