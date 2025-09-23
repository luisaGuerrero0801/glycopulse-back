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
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { IngredientesRecetaModule } from './ingredientes-receta/ingredientes-receta.module';
import { PasosRecetasModule } from './pasos-recetas/pasos-recetas.module';
import { RecomendacionesGlucometriaModule } from './recomendaciones-glucometria/recomendaciones-glucometria.module';
import { EstadoGlucometriaModule } from './estado-glucometria/estado-glucometria.module';
import { RecomendacionesEstadoModule } from './recomendaciones-estado/recomendaciones-estado.module';
import { RangoGlucometriasModule } from './rango-glucometrias/rango-glucometrias.module';
import { UsuarioRolSeed } from './seeds/seed-usuario-rol.service';
import { EstadoSeed } from './seeds/seed-estado.service';
import { RangoSeed } from './seeds/seed-rango.service';
import { RecomendacionSeed } from './seeds/seed-recomendaciones.service';
import { RecomendacionEstadoSeed } from './seeds/seed-recomendaciones-estado.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario, Rol]),
    RecetasModule,
    UsuariosModule,
    AuthModule,
    GlucometriasModule,
    RolesModule,
    IngredientesModule,
    IngredientesRecetaModule,
    PasosRecetasModule,
    RecomendacionesGlucometriaModule,
    EstadoGlucometriaModule,
    RecomendacionesEstadoModule,
    RangoGlucometriasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedService,
    UsuarioRolSeed,
    EstadoSeed,
    RangoSeed,
    RecomendacionSeed,
    RecomendacionEstadoSeed,
  ],
})
export class AppModule {}
