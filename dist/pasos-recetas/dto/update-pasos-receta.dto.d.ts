import { CreatePasosRecetaDto } from './create-pasos-receta.dto';
declare const UpdatePasosRecetaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePasosRecetaDto>>;
export declare class UpdatePasosRecetaDto extends UpdatePasosRecetaDto_base {
    ordenPasoReceta?: number;
    descripcionPasoReceta?: string;
}
export {};
