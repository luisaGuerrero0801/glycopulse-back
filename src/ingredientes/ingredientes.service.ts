import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingrediente } from './entities/ingrediente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientesService {
  constructor(
    @InjectRepository(Ingrediente)
    private readonly ingredienteRepo: Repository<Ingrediente>
  ) {}

  async create(
    createIngredienteDto: CreateIngredienteDto
  ): Promise<Ingrediente> {
    const exists = await this.ingredienteRepo.findOne({
      where: { nombreIngrediente: createIngredienteDto.nombreIngrediente },
    });

    if (exists) {
      throw new ConflictException(
        `El ingrediente "${createIngredienteDto.nombreIngrediente}" ya existe`
      );
    }

    const ingrediente = this.ingredienteRepo.create(createIngredienteDto);
    return this.ingredienteRepo.save(ingrediente);
  }

  async findAll(): Promise<Ingrediente[]> {
    return this.ingredienteRepo.find({ relations: ['recetas'] });
  }

  async findOne(idIngrediente: number): Promise<Ingrediente> {
    const ingrediente = await this.ingredienteRepo.findOne({
      where: { idIngrediente: idIngrediente },
      relations: ['recetas'],
    });
    if (!ingrediente) throw new NotFoundException('Ingrediente no encontrado');
    return ingrediente;
  }

  async update(
    idIngrediente: number,
    updateIngredienteDto: UpdateIngredienteDto
  ): Promise<Ingrediente> {
    const ingrediente = await this.findOne(idIngrediente);

    if (updateIngredienteDto.nombreIngrediente) {
      const exists = await this.ingredienteRepo.findOne({
        where: { nombreIngrediente: updateIngredienteDto.nombreIngrediente },
      });
      if (exists && exists.idIngrediente !== idIngrediente) {
        throw new ConflictException(
          `El ingrediente "${updateIngredienteDto.nombreIngrediente}" ya existe`
        );
      }
    }
    Object.assign(ingrediente, updateIngredienteDto);
    return this.ingredienteRepo.save(ingrediente);
  }

  async remove(idIngrediente: number): Promise<void> {
    const ingrediente = await this.findOne(idIngrediente);
    if (!ingrediente) {
      throw new HttpException('Este Ingrediente No existe', HttpStatus.OK);
    }
    await this.ingredienteRepo.remove(ingrediente);
    throw new HttpException(
      'Ingrediente eliminado correctamente',
      HttpStatus.OK
    );
  }
}
