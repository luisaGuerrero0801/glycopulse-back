import { Module } from '@nestjs/common';
import { PasosRecetasService } from './pasos-recetas.service';
import { PasosRecetasController } from './pasos-recetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from 'src/recetas/entities/receta.entity';
import { PasosReceta } from 'src/pasos-recetas/entities/pasos-receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasosReceta, Receta]), Repository],
  controllers: [PasosRecetasController],
  providers: [PasosRecetasService],
})
export class PasosRecetasModule {}
