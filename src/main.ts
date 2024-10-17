import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  console.log('process.env.MYSOFTLINKS_URL', process.env.MYSOFTLINKS_URL);
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.MYSOFTLINKS_URL],
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