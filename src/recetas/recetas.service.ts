import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta) private readonly recetas: Repository<Receta>,
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>
  ) {}

  async create(
    createRecetaDto: CreateRecetaDto,
    userId: string
  ): Promise<Receta> {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException('El ID de usuario no es válido');
    }

    const usuario = await this.usuarios.findOne({
      where: { idUsuario: userIdNumber },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const receta = this.recetas.create({
      nombreReceta: createRecetaDto.nombreReceta,
      descripcionReceta: createRecetaDto.descripcionReceta,
      porcionesReceta: createRecetaDto.porcionesReceta,
      caloriasReceta: createRecetaDto.caloriasReceta,
      tiempoReceta: createRecetaDto.tiempoReceta,
      imagenReceta: createRecetaDto.imagenReceta,
      nivelReceta: createRecetaDto.nivelReceta,
      categoriaReceta: createRecetaDto.categoriaReceta,
      usuario,
    });

    return await this.recetas.save(receta);
  }

  async findAll() {
    return await this.recetas.find({ relations: ['usuario'] });
  }

  async findOne(idReceta: number) {
    return await this.recetas.findOne({
      where: { idReceta },
      relations: ['usuario'],
    });
  }

  async update(
    idReceta: number,
    updateRecetaDto: UpdateRecetaDto,
    userId: string
  ) {
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new BadRequestException('El ID de usuario no es válido');
    }

    // Buscar la receta que coincida con el id y el userId
    const receta = await this.recetas.findOne({
      where: {
        idReceta: idReceta,
        usuario: { idUsuario: userIdNumber }, // si tienes relación ManyToOne con User
      },
    });

    if (!receta) {
      throw new BadRequestException(
        'No se encuentra esta receta o no tienes permiso para editarla'
      );
    }

    Object.assign(receta, updateRecetaDto);

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
