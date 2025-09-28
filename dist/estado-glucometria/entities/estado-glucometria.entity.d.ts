import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
export declare class EstadoGlucometria {
    idEstado: number;
    nombreEstado: string;
    descripcionEstado: string;
    recomendaciones: RecomendacionesEstado[];
    rangos: RangoGlucometria[];
}
