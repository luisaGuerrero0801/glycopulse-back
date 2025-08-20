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
} from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Request } from 'express';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Paciente')
  create(@Body() createRecetaDto: CreateRecetaDto, @Req() req: Request) {
    const userId = req.user?.sub;
    return this.recetasService.create(createRecetaDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Paciente')
  findAll() {
    return this.recetasService.findAll();
  }

  @Get(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  findOne(@Param('idReceta', ParseIntPipe) idReceta: number) {
    return this.recetasService.findOne(idReceta);
  }

  @Patch(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  update(
    @Param('idReceta', ParseIntPipe) idReceta: number,
    @Body() updateRecetaDto: UpdateRecetaDto,
    @Req() req: Request
  ) {
    const userId = req.user?.sub;
    return this.recetasService.update(idReceta, updateRecetaDto, userId);
  }

  @Delete(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  remove(@Param('idReceta', ParseIntPipe) idReceta: number) {
    return this.recetasService.remove(idReceta);
  }
}
