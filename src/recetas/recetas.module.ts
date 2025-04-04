import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Receta]), Repository, CategoriasModule],
  controllers: [RecetasController],
  providers: [RecetasService, RolesGuard],
  exports: [RecetasService, TypeOrmModule],
})
export class RecetasModule {}
