import { CreateIngredientesRecetaDto } from './create-ingredientes-receta.dto';
declare const UpdateIngredientesRecetaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateIngredientesRecetaDto>>;
export declare class UpdateIngredientesRecetaDto extends UpdateIngredientesRecetaDto_base {
    nombreIngrediente?: string;
    cantidadIngredienteReceta?: number;
    medidaIngredienteReceta?: string;
}
export {};
