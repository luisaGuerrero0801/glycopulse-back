import { Injectable } from '@nestjs/common';
import { CreatePasosRecetaDto } from './dto/create-pasos-receta.dto';
import { UpdatePasosRecetaDto } from './dto/update-pasos-receta.dto';

@Injectable()
export class PasosRecetasService {
  create(createPasosRecetaDto: CreatePasosRecetaDto) {
    return 'This action adds a new pasosReceta';
  }

  findAll() {
    return `This action returns all pasosRecetas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pasosReceta`;
  }

  update(id: number, updatePasosRecetaDto: UpdatePasosRecetaDto) {
    return `This action updates a #${id} pasosReceta`;
  }

  remove(id: number) {
    return `This action removes a #${id} pasosReceta`;
  }
}
