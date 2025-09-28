import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { IngredientesReceta } from 'src/ingredientes-receta/entities/ingredientes-receta.entity';
import { PasosReceta } from 'src/pasos-recetas/entities/pasos-receta.entity';
export declare class Receta {
    idReceta: number;
    nombreReceta: string;
    descripcionReceta: string;
    porcionesReceta: number;
    caloriasReceta: number;
    tiempoReceta: string;
    imagenReceta: string;
    nivelReceta: string;
    categoriaReceta: string;
    usuario: Usuario;
    ingredientes: IngredientesReceta[];
    pasos: PasosReceta[];
}
