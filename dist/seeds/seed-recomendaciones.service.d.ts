import { Repository } from 'typeorm';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';
export declare class RecomendacionSeed {
    private readonly recomendacionRepo;
    constructor(recomendacionRepo: Repository<RecomendacionesGlucometria>);
    run(): Promise<void>;
}
