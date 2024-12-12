import { Injectable } from '@nestjs/common';

@Injectable()
export class GlucometriasService {
  findAll() {
    return `This action returns all glucometrias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} glucometria`;
  }

  remove(id: number) {
    return `This action removes a #${id} glucometria`;
  }
}
