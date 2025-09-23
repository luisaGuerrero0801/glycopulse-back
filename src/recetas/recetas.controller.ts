import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Doctor')
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetasService.create(
      createRecetaDto,
      createRecetaDto.idUsuario
    );
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Doctor', 'Paciente')
  findAll() {
    return this.recetasService.findAll();
  }

  @Get(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Doctor', 'Paciente')
  findOne(@Param('idReceta', ParseIntPipe) idReceta: number) {
    return this.recetasService.findOne(idReceta);
  }

  @Get('usuario/:idUsuario')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Doctor', 'Paciente')
  findRecetaByPaciente(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.recetasService.findRecetaByPaciente(idUsuario);
  }

  @Patch(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Doctor')
  update(
    @Param('idReceta', ParseIntPipe) idReceta: number,
    @Body() updateRecetaDto: UpdateRecetaDto
  ) {
    return this.recetasService.update(
      idReceta,
      updateRecetaDto,
      updateRecetaDto.idUsuario
    );
  }

  @Delete(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Doctor')
  remove(@Param('idReceta', ParseIntPipe) idReceta: number) {
    return this.recetasService.remove(idReceta);
  }
}
