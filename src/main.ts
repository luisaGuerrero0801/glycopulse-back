import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para permitir solicitudes desde localhost:5173
  app.enableCors({
    origin: 'http://localhost:5173', // Permite solo solicitudes desde tu frontend en localhost:5173
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
