import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  findAll() {
    return this.recetasService.findAll();
  }

  @Get(':idReceta')
  findOne(@Param('idReceta') idReceta: number) {
    return this.recetasService.findOne(idReceta);
  }

  @Patch(':idReceta')
  update(
    @Param('idReceta') idReceta: number,
    @Body() updateRecetaDto: UpdateRecetaDto,
  ) {
    return this.recetasService.update(idReceta, updateRecetaDto);
  }

  @Delete(':idReceta')
  remove(@Param('idReceta') idReceta: number) {
    return this.recetasService.remove(idReceta);
  }
}
