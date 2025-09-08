import { Injectable } from '@nestjs/common';
/**import { CreateIngredientesRecetaDto } from './dto/create-ingredientes-receta.dto';
import { UpdateIngredientesRecetaDto } from './dto/update-ingredientes-receta.dto';**/

@Injectable()
export class IngredientesRecetaService {
  /**create(createIngredientesRecetaDto: CreateIngredientesRecetaDto) {
    return 'This action adds a new ingredientesReceta';
  }**/

  findAll() {
    return `This action returns all ingredientesReceta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientesReceta`;
  }

  /**update(id: number, updateIngredientesRecetaDto: UpdateIngredientesRecetaDto) {
    return `This action updates a #${id} ingredientesReceta`;
  }**/

  remove(id: number) {
    return `This action removes a #${id} ingredientesReceta`;
  }
}
