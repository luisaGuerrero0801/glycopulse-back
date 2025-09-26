import { Controller, Get, Param, Delete } from '@nestjs/common';
import { RangoGlucometriasService } from './rango-glucometrias.service';

@Controller('rango-glucometrias')
export class RangoGlucometriasController {
  constructor(
    private readonly rangoGlucometriasService: RangoGlucometriasService
  ) {}
  @Get()
  findAll() {
    return this.rangoGlucometriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rangoGlucometriasService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rangoGlucometriasService.remove(+id);
  }
}
