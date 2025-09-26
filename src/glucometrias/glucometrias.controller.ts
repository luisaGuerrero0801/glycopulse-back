import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Query,
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

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.glucometrias.findOneById(Number(id));
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente', 'Doctor')
  async findAllByUser(
    @Param('userId') userId: string,
    @Query('fechaGlucometria') fecha?: string,
    @Query('horaGlucometria') hora?: string,
    @Query('rangoGlucometria') rango?: string,
    @Query('orderBy') orderBy?: 'fecha' | 'hora' | 'nivel',
    @Query('order') order?: 'ASC' | 'DESC'
  ) {
    return this.glucometrias.findAllByUser(userId, {
      fechaGlucometria: fecha,
      horaGlucometria: hora,
      rangoGlucometria: rango,
      orderBy,
      order,
    });
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
