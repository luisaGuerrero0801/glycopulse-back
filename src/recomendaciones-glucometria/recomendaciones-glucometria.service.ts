import { Injectable } from '@nestjs/common';
import { CreateRecomendacionesGlucometriaDto } from './dto/create-recomendaciones-glucometria.dto';
import { UpdateRecomendacionesGlucometriaDto } from './dto/update-recomendaciones-glucometria.dto';

@Injectable()
export class RecomendacionesGlucometriaService {
  create(createRecomendacionesGlucometriaDto: CreateRecomendacionesGlucometriaDto) {
    return 'This action adds a new recomendacionesGlucometria';
  }

  findAll() {
    return `This action returns all recomendacionesGlucometria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recomendacionesGlucometria`;
  }

  update(id: number, updateRecomendacionesGlucometriaDto: UpdateRecomendacionesGlucometriaDto) {
    return `This action updates a #${id} recomendacionesGlucometria`;
  }

  remove(id: number) {
    return `This action removes a #${id} recomendacionesGlucometria`;
  }
}
