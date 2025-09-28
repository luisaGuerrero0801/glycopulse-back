import { Repository } from 'typeorm';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
export declare class EstadoSeed {
    private readonly estadoRepo;
    constructor(estadoRepo: Repository<EstadoGlucometria>);
    run(): Promise<void>;
}
