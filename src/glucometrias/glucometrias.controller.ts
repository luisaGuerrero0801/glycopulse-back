import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GlucometriasService } from './glucometrias.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateGlucometriaDto } from './dto/create-glucometria.dto';
import { UpdateGlucometriaDto } from './dto/update-glucometria.dto';

@Controller('glucometrias')
export class GlucometriasController {
  constructor(private readonly glucometrias: GlucometriasService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  create(@Body() createGlucometriaDto: CreateGlucometriaDto) {
    return this.glucometrias.create(createGlucometriaDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  findAll() {
    return this.glucometrias.findAll();
  }

  @Get(':idGlucometria')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  findOne(@Param('idGlucometria') idGlucometria: number) {
    return this.glucometrias.findOne(idGlucometria);
  }

  @Patch(':idGlucometria')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  update(
    @Param('idGlucometria') idGlucometria: number,
    @Body() updateGlucometriaDto: UpdateGlucometriaDto,
  ) {
    return this.glucometrias.update(idGlucometria, updateGlucometriaDto);
  }

  @Delete(':idGlucometria')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  remove(@Param('idGlucometria') idGlucometria: number) {
    return this.glucometrias.remove(idGlucometria);
  }
}
