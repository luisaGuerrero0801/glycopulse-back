import { CreateRecomendacionesEstadoDto } from './dto/create-recomendaciones-estado.dto';
import { UpdateRecomendacionesEstadoDto } from './dto/update-recomendaciones-estado.dto';
export declare class RecomendacionesEstadoService {
    create(createRecomendacionesEstadoDto: CreateRecomendacionesEstadoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRecomendacionesEstadoDto: UpdateRecomendacionesEstadoDto): string;
    remove(id: number): string;
}
