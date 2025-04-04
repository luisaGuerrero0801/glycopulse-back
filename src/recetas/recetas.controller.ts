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
  @Roles('Paciente')
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  findAll() {
    return this.recetasService.findAll();
  }

  @Get(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  findOne(@Param('idReceta') idReceta: number) {
    return this.recetasService.findOne(idReceta);
  }

  @Patch(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  update(
    @Param('idReceta') idReceta: number,
    @Body() updateRecetaDto: UpdateRecetaDto,
  ) {
    return this.recetasService.update(idReceta, updateRecetaDto);
  }

  @Delete(':idReceta')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Paciente')
  remove(@Param('idReceta') idReceta: number) {
    return this.recetasService.remove(idReceta);
  }
}
