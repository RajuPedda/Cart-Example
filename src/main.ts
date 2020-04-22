import { NestFactory } from '@nestjs/core';

import 'dotenv/config';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });

  /* Appling validation pipe globally so that all the routes will be validated automatically */
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT);
}
bootstrap();
