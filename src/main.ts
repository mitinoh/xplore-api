
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import getLogLevels from './shared/getLogLevels';

async function bootstrap() {

  const app = await NestFactory.create(
    AppModule, 
    {
      logger: getLogLevels(process.env.NODE_ENV === 'production')
    });
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true, // allow conversion underneath
    },
  }))
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  
  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
  .setTitle('nj1')
  .setDescription('nj1-core for xplore rest api')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000); // TODO: se porta occupata cambiare porta e fare log in ogni caso 
}
bootstrap();
