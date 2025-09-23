import { IngredientesReceta } from './../ingredientes-receta/entities/ingredientes-receta.entity';
import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UsuariosModule } from 'src/usuarios/usuarios.module'; // ✅ Se agrega la importación
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';
import { PasosReceta } from 'src/pasos-recetas/entities/pasos-receta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Receta,
      Usuario,
      IngredientesReceta,
      Ingrediente,
      PasosReceta,
    ]),
    Repository,
    UsuariosModule, // ✅ Se agrega aquí
  ],
  controllers: [RecetasController],
  providers: [RecetasService, RolesGuard],
  exports: [RecetasService, TypeOrmModule],
})
export class RecetasModule {}
