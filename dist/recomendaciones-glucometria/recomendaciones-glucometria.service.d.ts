import { CreateRecomendacionesGlucometriaDto } from './dto/create-recomendaciones-glucometria.dto';
import { UpdateRecomendacionesGlucometriaDto } from './dto/update-recomendaciones-glucometria.dto';
export declare class RecomendacionesGlucometriaService {
    create(createRecomendacionesGlucometriaDto: CreateRecomendacionesGlucometriaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRecomendacionesGlucometriaDto: UpdateRecomendacionesGlucometriaDto): string;
    remove(id: number): string;
}
