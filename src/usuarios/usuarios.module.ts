import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from 'src/roles/entities/rol.entity';
import { RolesModule } from 'src/roles/roles.module';
import { MailerModule } from 'src/mail/mailer.module'; // ✅ Asegúrate de la ruta

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol]),
    RolesModule,
    MailerModule, // ✅ Importar el módulo para que funcione el MailerService
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}
