import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Receta } from './entities/receta.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta) private readonly recetas: Repository<Receta>,
    @InjectRepository(Categoria)
    private readonly categorias: Repository<Categoria>
  ) {}

  async create(createRecetaDto: CreateRecetaDto) {
    const categorias = await this.categorias.find({
      where: { nombreCategoria: In(createRecetaDto.categoriaReceta) },
    });

    if (categorias.length === 0) {
      throw new NotFoundException(
        'No se encontraron las categorías especificadas'
      );
    }
    const receta = this.recetas.create({ ...createRecetaDto, categorias });
    return await this.recetas.save(receta);
  }

  async findAll() {
    return await this.recetas.find();
  }

  async findOne(idReceta: number) {
    return await this.recetas.findOneBy({ idReceta });
  }

  async update(idReceta: number, updateRecetaDto: UpdateRecetaDto) {
    const receta = await this.recetas.findOne({
      where: { idReceta },
      relations: ['categorias'],
    });

    if (!receta) {
      throw new BadRequestException('No se encuentra esta receta');
    }

    const categorias = await this.categorias.find({
      where: { nombreCategoria: In(updateRecetaDto.categoriaReceta) },
    });

    if (categorias.length === 0) {
      throw new NotFoundException(
        'No se encontraron las categorías especificadas'
      );
    }

    Object.assign(receta, { ...updateRecetaDto, categorias });

    return this.recetas.save(receta);
  }

  async remove(idReceta: number) {
    const receta = await this.recetas.findOneBy({ idReceta });
    if (!receta) {
      throw new HttpException('Esta receta No existe', HttpStatus.OK);
    }
    await this.recetas.delete(idReceta);
    throw new HttpException('Receta eliminada correctamente', HttpStatus.OK);
  }
}
