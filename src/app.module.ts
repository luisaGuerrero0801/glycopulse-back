import { Module } from '@nestjs/common';
import { RecetasModule } from './recetas/recetas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { GlucometriasModule } from './glucometrias/glucometrias.module';
import { RolesModule } from './roles/roles.module';
import { SeedService } from './seeds/seed.service';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Rol } from './roles/entities/rol.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'glyco',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario, Rol]),
    RecetasModule,
    UsuariosModule,
    AuthModule,
    GlucometriasModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
