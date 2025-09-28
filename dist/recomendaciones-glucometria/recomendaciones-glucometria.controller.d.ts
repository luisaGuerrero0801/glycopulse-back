import { RecomendacionesGlucometriaService } from './recomendaciones-glucometria.service';
import { CreateRecomendacionesGlucometriaDto } from './dto/create-recomendaciones-glucometria.dto';
import { UpdateRecomendacionesGlucometriaDto } from './dto/update-recomendaciones-glucometria.dto';
export declare class RecomendacionesGlucometriaController {
    private readonly recomendacionesGlucometriaService;
    constructor(recomendacionesGlucometriaService: RecomendacionesGlucometriaService);
    create(createRecomendacionesGlucometriaDto: CreateRecomendacionesGlucometriaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRecomendacionesGlucometriaDto: UpdateRecomendacionesGlucometriaDto): string;
    remove(id: string): string;
}
