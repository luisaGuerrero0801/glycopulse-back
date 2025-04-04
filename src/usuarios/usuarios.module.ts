import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Repository } from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol]), Repository, RolesModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
