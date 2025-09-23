import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientesRecetaService {
  findAll() {
    return `This action returns all ingredientesReceta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientesReceta`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientesReceta`;
  }
}
