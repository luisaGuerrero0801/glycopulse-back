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
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/guard/auth.guard';

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
      Receta,
      Usuario,
      IngredientesReceta,
      Ingrediente,
      PasosReceta,
    ]),
    Repository,
    UsuariosModule,
    ConfigModule, // ✅ Se agrega aquí
  ],
  controllers: [RecetasController],
  providers: [RecetasService, RolesGuard, AuthGuard],
  exports: [RecetasService, TypeOrmModule],
})
export class RecetasModule {}
