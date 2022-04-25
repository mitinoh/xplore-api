
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import getLogLevels from './shared/getLogLevels';

async function bootstrap() {

  const app = await NestFactory.create(
    AppModule, 
    {
      logger: getLogLevels(process.env.NODE_ENV === 'production')
    });
  app.useGlobalPipes(new ValidationPipe())
  useContainer(app.select(AppModule), { fallbackOnErrors: true });


  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
  .setTitle('nj1')
  .setDescription('nj1-core for xplore rest api')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
