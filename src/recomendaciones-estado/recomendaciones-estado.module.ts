import { Module } from '@nestjs/common';
import { RecomendacionesEstadoService } from './recomendaciones-estado.service';
import { RecomendacionesEstadoController } from './recomendaciones-estado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecomendacionesGlucometria } from 'src/recomendaciones-glucometria/entities/recomendaciones-glucometria.entity';
import { RecomendacionesEstado } from './entities/recomendaciones-estado.entity';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { Repository } from 'typeorm';
import { EstadoGlucometriaModule } from 'src/estado-glucometria/estado-glucometria.module';
import { RecomendacionesGlucometriaModule } from 'src/recomendaciones-glucometria/recomendaciones-glucometria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecomendacionesGlucometria,
      RecomendacionesEstado,
      EstadoGlucometria,
    ]),
    Repository,
    EstadoGlucometriaModule,
    RecomendacionesGlucometriaModule,
  ],
  controllers: [RecomendacionesEstadoController],
  providers: [RecomendacionesEstadoService],
  exports: [TypeOrmModule],
})
export class RecomendacionesEstadoModule {}
