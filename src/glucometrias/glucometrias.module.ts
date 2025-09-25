import { Module } from '@nestjs/common';
import { GlucometriasService } from './glucometrias.service';
import { GlucometriasController } from './glucometrias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glucometria } from './entities/glucometria.entity';
import { Repository } from 'typeorm';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RangoGlucometria } from 'src/rango-glucometrias/entities/rango-glucometria.entity';
import { RangoGlucometriasModule } from 'src/rango-glucometrias/rango-glucometrias.module';
import { RecomendacionesEstadoModule } from 'src/recomendaciones-estado/recomendaciones-estado.module';
import { RecomendacionesEstado } from 'src/recomendaciones-estado/entities/recomendaciones-estado.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([
      Glucometria,
      Usuario,
      RangoGlucometria,
      RecomendacionesEstado,
    ]),
    Repository,
    UsuariosModule,
    RangoGlucometriasModule,
    RecomendacionesEstadoModule,
    ConfigModule,
  ],
  controllers: [GlucometriasController],
  providers: [GlucometriasService, AuthGuard],
  exports: [GlucometriasService, TypeOrmModule],
})
export class GlucometriasModule {}
