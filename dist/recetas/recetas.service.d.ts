import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { IngredientesReceta } from 'src/ingredientes-receta/entities/ingredientes-receta.entity';
import { PasosReceta } from 'src/pasos-recetas/entities/pasos-receta.entity';
export declare class RecetasService {
    private readonly recetas;
    private readonly usuarios;
    private readonly ingredienteRepo;
    private readonly ingredientesRecetaRepo;
    private readonly pasosRecetaRepo;
    constructor(recetas: Repository<Receta>, usuarios: Repository<Usuario>, ingredienteRepo: Repository<Ingrediente>, ingredientesRecetaRepo: Repository<IngredientesReceta>, pasosRecetaRepo: Repository<PasosReceta>);
    private envioIngredientes;
    private envioPasos;
    create(createRecetaDto: CreateRecetaDto, pacienteId: number): Promise<Receta>;
    findAll(): Promise<Receta[]>;
    findOne(idReceta: number): Promise<Receta>;
    findRecetaByPaciente(idUsuario: number): Promise<Receta[]>;
    update(idReceta: number, updateRecetaDto: UpdateRecetaDto, pacienteId: number): Promise<Receta>;
    remove(idReceta: number): Promise<{
        message: string;
    }>;
}
