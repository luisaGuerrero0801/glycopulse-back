import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
export declare class RecetasController {
    private readonly recetasService;
    constructor(recetasService: RecetasService);
    create(createRecetaDto: CreateRecetaDto): Promise<import("./entities/receta.entity").Receta>;
    findAll(): Promise<import("./entities/receta.entity").Receta[]>;
    findOne(idReceta: number): Promise<import("./entities/receta.entity").Receta>;
    findRecetaByPaciente(idUsuario: number): Promise<import("./entities/receta.entity").Receta[]>;
    update(idReceta: number, updateRecetaDto: UpdateRecetaDto): Promise<import("./entities/receta.entity").Receta>;
    remove(idReceta: number): Promise<{
        message: string;
    }>;
}
