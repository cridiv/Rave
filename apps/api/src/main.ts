// src/main.ts
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://rave-ai.vercel.app',
    credentials: true,
  });

  await app.listen(5000);
}
bootstrap();
