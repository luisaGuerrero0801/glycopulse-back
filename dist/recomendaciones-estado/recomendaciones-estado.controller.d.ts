import { RecomendacionesEstadoService } from './recomendaciones-estado.service';
import { CreateRecomendacionesEstadoDto } from './dto/create-recomendaciones-estado.dto';
import { UpdateRecomendacionesEstadoDto } from './dto/update-recomendaciones-estado.dto';
export declare class RecomendacionesEstadoController {
    private readonly recomendacionesEstadoService;
    constructor(recomendacionesEstadoService: RecomendacionesEstadoService);
    create(createRecomendacionesEstadoDto: CreateRecomendacionesEstadoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRecomendacionesEstadoDto: UpdateRecomendacionesEstadoDto): string;
    remove(id: string): string;
}
