import { Controller, Get, Param, Delete } from '@nestjs/common';
import { IngredientesRecetaService } from './ingredientes-receta.service';

@Controller('ingredientes-receta')
export class IngredientesRecetaController {
  constructor(
    private readonly ingredientesRecetaService: IngredientesRecetaService
  ) {}

  @Get()
  findAll() {
    return this.ingredientesRecetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientesRecetaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientesRecetaService.remove(+id);
  }
}
