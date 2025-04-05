import { Injectable } from '@nestjs/common';
import { CreateGlucometriaDto } from './dto/create-glucometria.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Glucometria } from './entities/glucometria.entity';
import { UpdateGlucometriaDto } from './dto/update-glucometria.dto';

@Injectable()
export class GlucometriasService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
    @InjectRepository(Glucometria)
    private readonly glucometrias: Repository<Glucometria>,
  ) {}

  async create(
    createGlucometriaDto: CreateGlucometriaDto,
  ): Promise<Glucometria> {
    /**const usuario = await this.usuarios.findOne()**/
    return await this.glucometrias.save(createGlucometriaDto);
  }

  findAll() {
    return `This action returns all glucometrias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} glucometria`;
  }

  async update(
    idGlucometria: number,
    updateGlucometriaDto: UpdateGlucometriaDto,
  ): Promise<Glucometria> {
    return await this.glucometrias.save(updateGlucometriaDto);
  }

  remove(id: number) {
    return `This action removes a #${id} glucometria`;
  }
}
