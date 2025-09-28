import { CreateRecomendacionesGlucometriaDto } from './create-recomendaciones-glucometria.dto';
declare const UpdateRecomendacionesGlucometriaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRecomendacionesGlucometriaDto>>;
export declare class UpdateRecomendacionesGlucometriaDto extends UpdateRecomendacionesGlucometriaDto_base {
    tipoRecomendacion?: string;
    descripcionRecomendacion?: string;
}
export {};
