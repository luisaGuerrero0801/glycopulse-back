import { CreateIngredientesRecetaDto } from 'src/ingredientes-receta/dto/create-ingredientes-receta.dto';
import { CreatePasosRecetaDto } from 'src/pasos-recetas/dto/create-pasos-receta.dto';
export declare class CreateRecetaDto {
    nombreReceta: string;
    descripcionReceta: string;
    porcionesReceta: number;
    caloriasReceta: number;
    tiempoReceta: string;
    imagenReceta: string;
    nivelReceta: string;
    categoriaReceta: string;
    ingredientes: CreateIngredientesRecetaDto[];
    idUsuario: number;
    pasos: CreatePasosRecetaDto[];
}
