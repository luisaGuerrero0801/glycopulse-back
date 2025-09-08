import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasosRecetasService } from './pasos-recetas.service';
import { CreatePasosRecetaDto } from './dto/create-pasos-receta.dto';
import { UpdatePasosRecetaDto } from './dto/update-pasos-receta.dto';

@Controller('pasos-recetas')
export class PasosRecetasController {
  constructor(private readonly pasosRecetasService: PasosRecetasService) {}

  @Post()
  create(@Body() createPasosRecetaDto: CreatePasosRecetaDto) {
    return this.pasosRecetasService.create(createPasosRecetaDto);
  }

  @Get()
  findAll() {
    return this.pasosRecetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasosRecetasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasosRecetaDto: UpdatePasosRecetaDto) {
    return this.pasosRecetasService.update(+id, updatePasosRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasosRecetasService.remove(+id);
  }
}
