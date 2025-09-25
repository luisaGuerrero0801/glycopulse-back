import {
  Controller,
  /*Get,*/
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { GlucometriasService } from './glucometrias.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateGlucometriaDto } from './dto/create-glucometria.dto';
import { UpdateGlucometriaDto } from './dto/update-glucometria.dto';
import { Request } from 'express';

@Controller('glucometrias')
export class GlucometriasController {
  constructor(private readonly glucometrias: GlucometriasService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  create(
    @Body() createGlucometriaDto: CreateGlucometriaDto,
    @Req() req: Request
  ) {
    const userId = req.user?.sub;
    return this.glucometrias.create(createGlucometriaDto, userId);
  }

  @Patch(':idGlucometria')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  update(
    @Param('idGlucometria', ParseIntPipe) idGlucometria: number,
    @Body() updateGlucometriaDto: UpdateGlucometriaDto,
    @Req() req: Request
  ) {
    const userId = req.user?.sub;
    return this.glucometrias.update(
      idGlucometria,
      updateGlucometriaDto,
      userId
    );
  }

  @Delete(':idGlucometria')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  remove(@Param('idGlucometria', ParseIntPipe) idGlucometria: number) {
    return this.glucometrias.remove(idGlucometria);
  }
}
