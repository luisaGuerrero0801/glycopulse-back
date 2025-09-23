import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RangoGlucometriasService } from './rango-glucometrias.service';
import { CreateRangoGlucometriaDto } from './dto/create-rango-glucometria.dto';
import { UpdateRangoGlucometriaDto } from './dto/update-rango-glucometria.dto';

@Controller('rango-glucometrias')
export class RangoGlucometriasController {
  constructor(private readonly rangoGlucometriasService: RangoGlucometriasService) {}

  @Post()
  create(@Body() createRangoGlucometriaDto: CreateRangoGlucometriaDto) {
    return this.rangoGlucometriasService.create(createRangoGlucometriaDto);
  }

  @Get()
  findAll() {
    return this.rangoGlucometriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rangoGlucometriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRangoGlucometriaDto: UpdateRangoGlucometriaDto) {
    return this.rangoGlucometriasService.update(+id, updateRangoGlucometriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rangoGlucometriasService.remove(+id);
  }
}
