import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const originUrl = 'https://cutlink.fyi';//configService.get<string>('MYSOFTLINKS_URL');

  app.enableCors({
    origin: originUrl,
    methods: ['GET', 'POST'],
    preflightContinue: false,
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