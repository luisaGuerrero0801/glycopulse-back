import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { IngredientesReceta } from 'src/ingredientes-receta/entities/ingredientes-receta.entity';
import { CreateIngredientesRecetaDto } from 'src/ingredientes-receta/dto/create-ingredientes-receta.dto';
import { UpdateIngredientesRecetaDto } from 'src/ingredientes-receta/dto/update-ingredientes-receta.dto';
import { PasosReceta } from 'src/pasos-recetas/entities/pasos-receta.entity';
import { CreatePasosRecetaDto } from 'src/pasos-recetas/dto/create-pasos-receta.dto';
import { UpdatePasosRecetaDto } from 'src/pasos-recetas/dto/update-pasos-receta.dto';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta) private readonly recetas: Repository<Receta>,
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Ingrediente)
    private readonly ingredienteRepo: Repository<Ingrediente>,

    @InjectRepository(IngredientesReceta)
    private readonly ingredientesRecetaRepo: Repository<IngredientesReceta>,

    @InjectRepository(PasosReceta)
    private readonly pasosRecetaRepo: Repository<PasosReceta>
  ) {}

  private async envioIngredientes(
    receta: Receta,
    ingredientesDto: (
      | CreateIngredientesRecetaDto
      | UpdateIngredientesRecetaDto
    )[],
    isUpdate = false
  ): Promise<void> {
    if (!ingredientesDto || ingredientesDto.length === 0) return;

    if (isUpdate) {
      await this.ingredientesRecetaRepo.delete({
        receta: { idReceta: receta.idReceta },
      });
    }

    for (const ingDto of ingredientesDto) {
      if (!ingDto.nombreIngrediente) {
        throw new BadRequestException(
          'El nombre del ingrediente es obligatorio'
        );
      }

      let ingrediente = await this.ingredienteRepo.findOne({
        where: { nombreIngrediente: ingDto.nombreIngrediente },
      });

      if (!ingrediente) {
        ingrediente = await this.ingredienteRepo.save(
          this.ingredienteRepo.create({
            nombreIngrediente: ingDto.nombreIngrediente,
          })
        );
      }

      const ingredienteReceta = this.ingredientesRecetaRepo.create({
        cantidadIngredienteReceta: ingDto.cantidadIngredienteReceta ?? 0,
        medidaIngredienteReceta: ingDto.medidaIngredienteReceta ?? '',
        ingrediente,
        receta,
      });

      await this.ingredientesRecetaRepo.save(ingredienteReceta);
    }
  }

  private async envioPasos(
    receta: Receta,
    pasosDto: (CreatePasosRecetaDto | UpdatePasosRecetaDto)[],
    isUpdate = false
  ): Promise<void> {
    if (!pasosDto || pasosDto.length === 0) return;

    if (isUpdate) {
      await this.pasosRecetaRepo.delete({
        receta: { idReceta: receta.idReceta },
      });
    }

    for (const paso of pasosDto) {
      const pasoEntity = this.pasosRecetaRepo.create({
        ordenPasoReceta: paso.ordenPasoReceta,
        descripcionPasoReceta: paso.descripcionPasoReceta,
        receta,
      });
      await this.pasosRecetaRepo.save(pasoEntity);
    }
  }

  async create(
    createRecetaDto: CreateRecetaDto,
    pacienteId: number
  ): Promise<Receta> {
    if (isNaN(pacienteId)) {
      throw new BadRequestException('El ID de paciente no es válido');
    }

    const usuario = await this.usuarios.findOne({
      where: { idUsuario: pacienteId },
    });
    if (!usuario) {
      throw new NotFoundException('Paciente no encontrado');
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

    const savedReceta = await this.recetas.save(receta);

    await this.envioIngredientes(savedReceta, createRecetaDto.ingredientes);
    await this.envioPasos(savedReceta, createRecetaDto.pasos);

    //  Devolver receta con ingredientes
    return await this.recetas.findOne({
      where: { idReceta: savedReceta.idReceta },
      relations: [
        'usuario',
        'ingredientes',
        'ingredientes.ingrediente',
        'pasos',
      ],
    });
  }

  async findAll() {
    return await this.recetas.find({
      relations: [
        'usuario',
        'ingredientes',
        'ingredientes.ingrediente',
        'pasos',
      ],
    });
  }

  async findOne(idReceta: number) {
    const receta = await this.recetas.findOne({
      where: { idReceta },
      relations: [
        'usuario',
        'ingredientes',
        'ingredientes.ingrediente',
        'pasos',
      ],
    });
    if (!receta) throw new NotFoundException('Receta no encontrada');
    return receta;
  }

  async findRecetaByPaciente(idUsuario: number) {
    const recetas = await this.recetas.find({
      where: { usuario: { idUsuario } },
      relations: [
        'usuario',
        'ingredientes',
        'ingredientes.ingrediente',
        'pasos',
      ],
    });
    if (!recetas || recetas.length === 0) {
      throw new NotFoundException(
        `No se encontraron recetas para el usuario con ID ${idUsuario}`
      );
    }
    return recetas;
  }

  async update(
    idReceta: number,
    updateRecetaDto: UpdateRecetaDto,
    pacienteId: number
  ) {
    if (isNaN(pacienteId)) {
      throw new BadRequestException('El ID de paciente no es válido');
    }

    const receta = await this.recetas.findOne({
      where: { idReceta, usuario: { idUsuario: pacienteId } },
      relations: ['ingredientes', 'ingredientes.ingrediente'],
    });

    if (!receta) throw new NotFoundException('Receta no encontrada');

    Object.assign(receta, {
      nombreReceta: updateRecetaDto.nombreReceta ?? receta.nombreReceta,
      descripcionReceta:
        updateRecetaDto.descripcionReceta ?? receta.descripcionReceta,
      porcionesReceta:
        updateRecetaDto.porcionesReceta ?? receta.porcionesReceta,
      caloriasReceta: updateRecetaDto.caloriasReceta ?? receta.caloriasReceta,
      tiempoReceta: updateRecetaDto.tiempoReceta ?? receta.tiempoReceta,
      imagenReceta: updateRecetaDto.imagenReceta ?? receta.imagenReceta,
      nivelReceta: updateRecetaDto.nivelReceta ?? receta.nivelReceta,
      categoriaReceta:
        updateRecetaDto.categoriaReceta ?? receta.categoriaReceta,
    });

    const savedReceta = await this.recetas.save(receta);

    if (updateRecetaDto.ingredientes) {
      await this.envioIngredientes(
        savedReceta,
        updateRecetaDto.ingredientes,
        true
      );
    }

    if (updateRecetaDto.pasos) {
      await this.envioPasos(savedReceta, updateRecetaDto.pasos, true);
    }

    return await this.recetas.findOne({
      where: { idReceta: savedReceta.idReceta },
      relations: ['ingredientes', 'ingredientes.ingrediente', 'pasos'],
    });
  }

  async remove(idReceta: number) {
    const receta = await this.recetas.findOneBy({ idReceta });
    if (!receta) {
      throw new NotFoundException('Esta receta no existe');
    }
    await this.recetas.remove(receta);
    return { message: 'Receta eliminada correctamente' };
  }
}
