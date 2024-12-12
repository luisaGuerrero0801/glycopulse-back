import { Controller, Get, Param, Delete } from '@nestjs/common';
import { GlucometriasService } from './glucometrias.service';

@Controller('glucometrias')
export class GlucometriasController {
  constructor(private readonly glucometriasService: GlucometriasService) {}

  @Get()
  findAll() {
    return this.glucometriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.glucometriasService.findOne(+id);
  }

  /**@Patch(':id')
  update(@Param('id') id: string, @Body() updateGlucometriaDto: UpdateGlucometriaDto) {
    return this.glucometriasService.update(+id, updateGlucometriaDto);
  }**/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.glucometriasService.remove(+id);
  }
}
