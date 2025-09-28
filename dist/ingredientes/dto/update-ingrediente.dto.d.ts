import { CreateIngredienteDto } from './create-ingrediente.dto';
declare const UpdateIngredienteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateIngredienteDto>>;
export declare class UpdateIngredienteDto extends UpdateIngredienteDto_base {
    nombreIngrediente?: string;
}
export {};
