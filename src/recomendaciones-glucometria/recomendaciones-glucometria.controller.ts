import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecomendacionesGlucometriaService } from './recomendaciones-glucometria.service';
import { CreateRecomendacionesGlucometriaDto } from './dto/create-recomendaciones-glucometria.dto';
import { UpdateRecomendacionesGlucometriaDto } from './dto/update-recomendaciones-glucometria.dto';

@Controller('recomendaciones-glucometria')
export class RecomendacionesGlucometriaController {
  constructor(private readonly recomendacionesGlucometriaService: RecomendacionesGlucometriaService) {}

  @Post()
  create(@Body() createRecomendacionesGlucometriaDto: CreateRecomendacionesGlucometriaDto) {
    return this.recomendacionesGlucometriaService.create(createRecomendacionesGlucometriaDto);
  }

  @Get()
  findAll() {
    return this.recomendacionesGlucometriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recomendacionesGlucometriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecomendacionesGlucometriaDto: UpdateRecomendacionesGlucometriaDto) {
    return this.recomendacionesGlucometriaService.update(+id, updateRecomendacionesGlucometriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recomendacionesGlucometriaService.remove(+id);
  }
}
