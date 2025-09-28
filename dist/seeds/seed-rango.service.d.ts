import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
export declare class RangoSeed {
    private rangoRepo;
    private estadoRepo;
    constructor(rangoRepo: Repository<RangoGlucometria>, estadoRepo: Repository<EstadoGlucometria>);
    run(): Promise<void>;
}
