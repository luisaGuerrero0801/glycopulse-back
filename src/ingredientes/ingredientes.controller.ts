import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IngredientesService } from './ingredientes.service';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Controller('ingredientes')
export class IngredientesController {
  constructor(private readonly ingredientesService: IngredientesService) {}

  @Post()
  create(@Body() createIngredienteDto: CreateIngredienteDto) {
    return this.ingredientesService.create(createIngredienteDto);
  }

  @Get()
  findAll() {
    return this.ingredientesService.findAll();
  }

  @Get(':idIngrediente')
  findOne(@Param('idIngrediente', ParseIntPipe) idIngrediente: number) {
    return this.ingredientesService.findOne(idIngrediente);
  }

  @Patch(':idIngrediente')
  update(
    @Param('idIngrediente', ParseIntPipe) idIngrediente: number,
    @Body() updateIngredienteDto: UpdateIngredienteDto
  ) {
    return this.ingredientesService.update(idIngrediente, updateIngredienteDto);
  }

  @Delete(':idIngrediente')
  remove(@Param('idIngrediente', ParseIntPipe) idIngrediente: number) {
    return this.ingredientesService.remove(idIngrediente);
  }
}
