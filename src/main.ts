import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['https://www.cutlink.fyi'],//[process.env.MYSOFTLINKS_URL],--> No sé por qué ya no quiere funcionar con el .env
      methods: ['GET', 'POST'],
      preflightContinue: false,
    }
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe ({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();