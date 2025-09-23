import { Injectable } from '@nestjs/common';
import { CreateRecomendacionesEstadoDto } from './dto/create-recomendaciones-estado.dto';
import { UpdateRecomendacionesEstadoDto } from './dto/update-recomendaciones-estado.dto';

@Injectable()
export class RecomendacionesEstadoService {
  create(createRecomendacionesEstadoDto: CreateRecomendacionesEstadoDto) {
    return 'This action adds a new recomendacionesEstado';
  }

  findAll() {
    return `This action returns all recomendacionesEstado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recomendacionesEstado`;
  }

  update(id: number, updateRecomendacionesEstadoDto: UpdateRecomendacionesEstadoDto) {
    return `This action updates a #${id} recomendacionesEstado`;
  }

  remove(id: number) {
    return `This action removes a #${id} recomendacionesEstado`;
  }
}
