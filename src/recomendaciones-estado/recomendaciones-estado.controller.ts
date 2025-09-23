import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecomendacionesEstadoService } from './recomendaciones-estado.service';
import { CreateRecomendacionesEstadoDto } from './dto/create-recomendaciones-estado.dto';
import { UpdateRecomendacionesEstadoDto } from './dto/update-recomendaciones-estado.dto';

@Controller('recomendaciones-estado')
export class RecomendacionesEstadoController {
  constructor(private readonly recomendacionesEstadoService: RecomendacionesEstadoService) {}

  @Post()
  create(@Body() createRecomendacionesEstadoDto: CreateRecomendacionesEstadoDto) {
    return this.recomendacionesEstadoService.create(createRecomendacionesEstadoDto);
  }

  @Get()
  findAll() {
    return this.recomendacionesEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recomendacionesEstadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecomendacionesEstadoDto: UpdateRecomendacionesEstadoDto) {
    return this.recomendacionesEstadoService.update(+id, updateRecomendacionesEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recomendacionesEstadoService.remove(+id);
  }
}
