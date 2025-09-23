import { Controller, Get, Param, Delete } from '@nestjs/common';
import { EstadoGlucometriaService } from './estado-glucometria.service';

@Controller('estado-glucometria')
export class EstadoGlucometriaController {
  constructor(
    private readonly estadoGlucometriaService: EstadoGlucometriaService
  ) {}

  @Get()
  findAll() {
    return this.estadoGlucometriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoGlucometriaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoGlucometriaService.remove(+id);
  }
}
