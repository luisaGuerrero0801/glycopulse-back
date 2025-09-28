import { PasosRecetasService } from './pasos-recetas.service';
export declare class PasosRecetasController {
    private readonly pasosRecetasService;
    constructor(pasosRecetasService: PasosRecetasService);
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
