import { MomentoGlucometria } from '../enums/momento-glucometria.enum';
export declare class ResponseGlucometriaDto {
    idGlucometria: number;
    fechaGlucometria: string;
    horaGlucometria: string;
    nivelGlucometria: number;
    momento: MomentoGlucometria;
    usuario: {
        idUsuario: number;
        nombres: string;
        apellidos: string;
        correo: string;
        rol: {
            idRol: number;
            nombreRol: string;
        };
    };
    rango: {
        idRango: number;
        nombreRango: string;
        valorMinRango: number;
        valorMaxRango: number;
        momento: MomentoGlucometria;
        color?: string;
    };
    estado: {
        idEstado: number;
        nombreEstado: string;
        descripcionEstado: string;
    };
    recomendaciones: {
        idRecomendacion: number;
        tipoRecomendacion: string;
        descripcionRecomendacion: string;
    }[];
}
