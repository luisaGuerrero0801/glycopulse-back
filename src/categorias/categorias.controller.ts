import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':idCategoria')
  findOne(@Param('ididCategoria') idCategoria: number) {
    return this.categoriasService.findOne(idCategoria);
  }

  @Patch(':idCategoria')
  update(
    @Param('idCategoria') idCategoria: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(idCategoria, updateCategoriaDto);
  }

  @Delete(':idCategoria')
  remove(@Param('idCategoria') idCategoria: number) {
    return this.categoriasService.remove(idCategoria);
  }
}
