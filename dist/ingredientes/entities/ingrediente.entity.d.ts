import { IngredientesReceta } from 'src/ingredientes-receta/entities/ingredientes-receta.entity';
export declare class Ingrediente {
    idIngrediente: number;
    nombreIngrediente: string;
    recetas: IngredientesReceta[];
    normalizeName(): void;
}
