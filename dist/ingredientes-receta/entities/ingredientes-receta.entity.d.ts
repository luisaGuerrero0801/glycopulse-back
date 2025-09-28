import { Receta } from 'src/recetas/entities/receta.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
export declare class IngredientesReceta {
    idIngredienteReceta: number;
    cantidadIngredienteReceta: number;
    medidaIngredienteReceta: string;
    receta: Receta;
    ingrediente: Ingrediente;
}
