import { IngredientesService } from './ingredientes.service';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
export declare class IngredientesController {
    private readonly ingredientesService;
    constructor(ingredientesService: IngredientesService);
    create(createIngredienteDto: CreateIngredienteDto): Promise<import("./entities/ingrediente.entity").Ingrediente>;
    findAll(): Promise<import("./entities/ingrediente.entity").Ingrediente[]>;
    findOne(idIngrediente: number): Promise<import("./entities/ingrediente.entity").Ingrediente>;
    update(idIngrediente: number, updateIngredienteDto: UpdateIngredienteDto): Promise<import("./entities/ingrediente.entity").Ingrediente>;
    remove(idIngrediente: number): Promise<void>;
}
