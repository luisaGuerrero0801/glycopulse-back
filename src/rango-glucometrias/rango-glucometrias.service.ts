import { Injectable } from '@nestjs/common';

@Injectable()
export class RangoGlucometriasService {
  findAll() {
    return `This action returns all rangoGlucometrias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rangoGlucometria`;
  }

  remove(id: number) {
    return `This action removes a #${id} rangoGlucometria`;
  }
}
