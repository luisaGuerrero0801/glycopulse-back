import { Module } from '@nestjs/common';
import { IngredientesService } from './ingredientes.service';
import { IngredientesController } from './ingredientes.controller';
import { IngredientesReceta } from './../ingredientes-receta/entities/ingredientes-receta.entity';
import { Ingrediente } from './entities/ingrediente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientesReceta, Ingrediente]),
    Repository,
  ],
  controllers: [IngredientesController],
  providers: [IngredientesService],
  exports: [TypeOrmModule],
})
export class IngredientesModule {}
