import { Module } from '@nestjs/common';
import { RecomendacionesGlucometriaService } from './recomendaciones-glucometria.service';
import { RecomendacionesGlucometriaController } from './recomendaciones-glucometria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecomendacionesGlucometria } from './entities/recomendaciones-glucometria.entity';
import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecomendacionesGlucometria,
      RecomendacionesEstado,
    ]),
    Repository,
  ],
  controllers: [RecomendacionesGlucometriaController],
  providers: [RecomendacionesGlucometriaService],
  exports: [TypeOrmModule],
})
export class RecomendacionesGlucometriaModule {}
