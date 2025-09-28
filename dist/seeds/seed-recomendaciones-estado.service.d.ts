import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';
import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
export declare class RecomendacionEstadoSeed {
    private readonly recEstadoRepo;
    private readonly estadoRepo;
    private readonly recRepo;
    constructor(recEstadoRepo: Repository<RecomendacionesEstado>, estadoRepo: Repository<EstadoGlucometria>, recRepo: Repository<RecomendacionesGlucometria>);
    run(): Promise<void>;
}
