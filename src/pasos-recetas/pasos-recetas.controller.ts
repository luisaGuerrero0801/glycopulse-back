import { Controller, Get, Param, Delete } from '@nestjs/common';
import { PasosRecetasService } from './pasos-recetas.service';

@Controller('pasos-recetas')
export class PasosRecetasController {
  constructor(private readonly pasosRecetasService: PasosRecetasService) {}

  @Get()
  findAll() {
    return this.pasosRecetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasosRecetasService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasosRecetasService.remove(+id);
  }
}
