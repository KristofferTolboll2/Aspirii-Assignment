import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger('main.ts');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3001;
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors({ origin: true });

  //Add swagger configuration to add documentation to all endpoints.
  const options = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      name: 'authorization',
    })
    .addServer(`http://localhost:${port}`)
    .setVersion('1.0');
  await app.listen(port, () => {
    logger.debug(`Server running on port ${port}`);
  });
}
bootstrap();
