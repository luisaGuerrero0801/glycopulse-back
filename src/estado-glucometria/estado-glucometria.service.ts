import { Injectable } from '@nestjs/common';

@Injectable()
export class EstadoGlucometriaService {
  findAll() {
    return `This action returns all estadoGlucometria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoGlucometria`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoGlucometria`;
  }
}
