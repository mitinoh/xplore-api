
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { MONGO_CONNECTION } from './app.properties';
import getLogLevels from './shared/getLogLevels';

async function bootstrap() {
  console.log("Mongo: " + MONGO_CONNECTION)

  const app = await NestFactory.create(
    AppModule,
    {
      logger: getLogLevels(process.env.NODE_ENV === 'prod')
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
    .setDescription('nj1-core for xplore rest api ' + process.env.NODE_ENV)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /*
    app.enableCors({
      allowedHeaders: "*",
      origin: "*"
    });
  */
  await app.listen(3000);
}
bootstrap();
