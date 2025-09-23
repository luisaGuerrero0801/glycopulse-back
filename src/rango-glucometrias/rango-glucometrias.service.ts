import { Injectable } from '@nestjs/common';
import { CreateRangoGlucometriaDto } from './dto/create-rango-glucometria.dto';
import { UpdateRangoGlucometriaDto } from './dto/update-rango-glucometria.dto';

@Injectable()
export class RangoGlucometriasService {
  create(createRangoGlucometriaDto: CreateRangoGlucometriaDto) {
    return 'This action adds a new rangoGlucometria';
  }

  findAll() {
    return `This action returns all rangoGlucometrias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rangoGlucometria`;
  }

  update(id: number, updateRangoGlucometriaDto: UpdateRangoGlucometriaDto) {
    return `This action updates a #${id} rangoGlucometria`;
  }

  remove(id: number) {
    return `This action removes a #${id} rangoGlucometria`;
  }
}
