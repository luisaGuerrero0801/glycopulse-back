import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categorias: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categorias.create(createCategoriaDto);
    return await this.categorias.save(categoria);
  }

  async findAll() {
    return await this.categorias.find();
  }

  async findOne(idCategoria: number) {
    return await this.categorias.findOneBy({ idCategoria });
  }

  async update(idCategoria: number, updateCategoria: UpdateCategoriaDto) {
    return await this.categorias.update(idCategoria, updateCategoria);
  }

  async remove(idCategoria: number) {
    const categoria = await this.categorias.findOneBy({ idCategoria });
    if (!categoria) {
      throw new HttpException('Esta receta No existe', HttpStatus.OK);
    }
    await this.categorias.delete(idCategoria);
    throw new HttpException('Categoria eliminada correctamente', HttpStatus.OK);
  }
}
