import { Module } from '@nestjs/common';
import { RecetasModule } from './recetas/recetas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { GlucometriasModule } from './glucometrias/glucometrias.module';

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
    RecetasModule,
    CategoriasModule,
    UsuariosModule,
    AuthModule,
    GlucometriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
