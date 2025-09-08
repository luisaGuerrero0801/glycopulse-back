import {
  Controller,
  Get,
  /**Post,
  Body,
  Patch,**/
  Param,
  Delete,
} from '@nestjs/common';
import { IngredientesRecetaService } from './ingredientes-receta.service';
/**import { CreateIngredientesRecetaDto } from './dto/create-ingredientes-receta.dto';
import { UpdateIngredientesRecetaDto } from './dto/update-ingredientes-receta.dto';**/

@Controller('ingredientes-receta')
export class IngredientesRecetaController {
  constructor(
    private readonly ingredientesRecetaService: IngredientesRecetaService
  ) {}

  /**@Post()
  create(@Body() createIngredientesRecetaDto: CreateIngredientesRecetaDto) {
    return this.ingredientesRecetaService.create(createIngredientesRecetaDto);
  }**/

  @Get()
  findAll() {
    return this.ingredientesRecetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientesRecetaService.findOne(+id);
  }

  /**@Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientesRecetaDto: UpdateIngredientesRecetaDto
  ) {
    return this.ingredientesRecetaService.update(
      +id,
      updateIngredientesRecetaDto
    );
  }**/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientesRecetaService.remove(+id);
  }
}
