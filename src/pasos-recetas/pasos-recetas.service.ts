import { Injectable } from '@nestjs/common';

@Injectable()
export class PasosRecetasService {
  findAll() {
    return `This action returns all pasosRecetas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pasosReceta`;
  }

  remove(id: number) {
    return `This action removes a #${id} pasosReceta`;
  }
}
