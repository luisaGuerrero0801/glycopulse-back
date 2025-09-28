import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';
export declare class RecomendacionesEstado {
    idRecomendacionEstado: number;
    recomendacion: RecomendacionesGlucometria;
    estado: EstadoGlucometria;
}
