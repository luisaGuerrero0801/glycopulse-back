import { IngredientesRecetaService } from './ingredientes-receta.service';
export declare class IngredientesRecetaController {
    private readonly ingredientesRecetaService;
    constructor(ingredientesRecetaService: IngredientesRecetaService);
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
