import { Module } from '@nestjs/common';
import { EstadoGlucometriaService } from './estado-glucometria.service';
import { EstadoGlucometriaController } from './estado-glucometria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoGlucometria } from './entities/estado-glucometria.entity';
import { Repository } from 'typeorm';
import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstadoGlucometria,
      RecomendacionesEstado,
      RecomendacionesGlucometria,
    ]),
    Repository,
  ],
  controllers: [EstadoGlucometriaController],
  providers: [EstadoGlucometriaService],
})
export class EstadoGlucometriaModule {}
