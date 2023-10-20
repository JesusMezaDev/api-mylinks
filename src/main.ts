import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
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
  console.log('test');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();