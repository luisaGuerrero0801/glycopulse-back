import { CreateRecetaDto } from './create-receta.dto';
import { UpdateIngredientesRecetaDto } from 'src/ingredientes-receta/dto/update-ingredientes-receta.dto';
import { UpdatePasosRecetaDto } from 'src/pasos-recetas/dto/update-pasos-receta.dto';
declare const UpdateRecetaDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateRecetaDto, "ingredientes" | "pasos">>>;
export declare class UpdateRecetaDto extends UpdateRecetaDto_base {
    nombreReceta?: string;
    descripcionReceta?: string;
    porcionesReceta?: number;
    caloriasReceta?: number;
    tiempoReceta?: string;
    imagenReceta?: string;
    nivelReceta?: string;
    categoriaReceta?: string;
    ingredientes?: UpdateIngredientesRecetaDto[];
    idUsuario?: number;
    pasos?: UpdatePasosRecetaDto[];
}
export {};
