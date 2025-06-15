import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from 'src/roles/entities/rol.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol]),
    RolesModule, // Importamos el módulo de roles para la relación
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [
    UsuariosService,          // Exportamos para que otros módulos puedan usar el servicio
    TypeOrmModule,            // También exportamos TypeOrmModule si otros lo requieren
  ],
})
export class UsuariosModule {}
