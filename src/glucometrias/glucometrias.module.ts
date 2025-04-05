import { Module } from '@nestjs/common';
import { GlucometriasService } from './glucometrias.service';
import { GlucometriasController } from './glucometrias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glucometria } from './entities/glucometria.entity';
import { Repository } from 'typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Glucometria, Usuario]),
    Repository,
    UsuariosModule,
  ],
  controllers: [GlucometriasController],
  providers: [GlucometriasService],
})
export class GlucometriasModule {}
