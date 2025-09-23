import { Module } from '@nestjs/common';
import { RangoGlucometriasService } from './rango-glucometrias.service';
import { RangoGlucometriasController } from './rango-glucometrias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RangoGlucometria } from './entities/rango-glucometria.entity';
import { Glucometria } from 'src/glucometrias/entities/glucometria.entity';
import { EstadoGlucometria } from 'src/estado-glucometria/entities/estado-glucometria.entity';
import { EstadoGlucometriaModule } from 'src/estado-glucometria/estado-glucometria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RangoGlucometria,
      Glucometria,
      EstadoGlucometria,
    ]),
    Repository,
    EstadoGlucometriaModule,
  ],
  controllers: [RangoGlucometriasController],
  providers: [RangoGlucometriasService],
  exports: [TypeOrmModule],
})
export class RangoGlucometriasModule {}
