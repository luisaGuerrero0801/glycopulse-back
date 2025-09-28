import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { Ingrediente } from './entities/ingrediente.entity';
import { Repository } from 'typeorm';
export declare class IngredientesService {
    private readonly ingredienteRepo;
    constructor(ingredienteRepo: Repository<Ingrediente>);
    create(createIngredienteDto: CreateIngredienteDto): Promise<Ingrediente>;
    findAll(): Promise<Ingrediente[]>;
    findOne(idIngrediente: number): Promise<Ingrediente>;
    update(idIngrediente: number, updateIngredienteDto: UpdateIngredienteDto): Promise<Ingrediente>;
    remove(idIngrediente: number): Promise<void>;
}
