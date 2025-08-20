import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { Repository } from 'typeorm';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UsuariosModule } from 'src/usuarios/usuarios.module'; // ✅ Se agrega la importación
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receta, Usuario]),
    Repository,
    UsuariosModule, // ✅ Se agrega aquí
  ],
  controllers: [RecetasController],
  providers: [RecetasService, RolesGuard],
  exports: [RecetasService, TypeOrmModule],
})
export class RecetasModule {}
