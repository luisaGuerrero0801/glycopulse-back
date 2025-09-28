import { RangoGlucometriasService } from './rango-glucometrias.service';
export declare class RangoGlucometriasController {
    private readonly rangoGlucometriasService;
    constructor(rangoGlucometriasService: RangoGlucometriasService);
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
