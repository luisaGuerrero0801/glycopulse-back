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

  @Get('rangos/nombres')
  async getNombresRangos() {
    return this.glucometrias.getNombresRangosUnicos();
  }

  @Get('last/:userId')
  findLastByUser(@Param('userId') userId: string) {
    return this.glucometrias.findLastByUser(userId);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente', 'Doctor')
  async findAllByUser(
    @Param('userId') userId: string,
    @Query()
    filters?: {
      fechaGlucometria?: string;
      horaGlucometria?: string;
      rangoGlucometria?: string;
      orderFecha?: 'ASC' | 'DESC';
      orderFechaHora?: 'ASC' | 'DESC';
      orderNivel?: 'ASC' | 'DESC';
    }
  ) {
    return this.glucometrias.findAllByUser(userId, filters);
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
