import { Module } from '@nestjs/common';
import { IngredientesRecetaService } from './ingredientes-receta.service';
import { IngredientesRecetaController } from './ingredientes-receta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { IngredientesReceta } from './../ingredientes-receta/entities/ingredientes-receta.entity';
import { Repository } from 'typeorm';
import { Receta } from 'src/recetas/entities/receta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receta, IngredientesReceta, Ingrediente]),
    Repository,
  ],
  controllers: [IngredientesRecetaController],
  providers: [IngredientesRecetaService],
})
export class IngredientesRecetaModule {}
