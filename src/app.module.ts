import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { MONGO_CONNECTION, assetsDir, logDir, logDatePattern,logFileMaxSize } from './app.properties';
import { AppService } from './app.service';
import { LocationModule } from './api/location/location.module';
import { LocationCategoryModule } from './api/location-category/location-category.module';
import { AuthService } from './auth/auth.service';
import { NewLocationModule } from './api/new-location/new-location.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './auth/auth.module';
import { PlanTripModule } from './api/plan-trip/plan-trip.module';
import { RateLocationModule } from './api/rate-location/rate-location.module';
import { SaveLocationModule } from './api/save-location/save-location.module';
import { VisitLocationModule } from './api/visit-location/visit-location.module';
import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';
import { ImageModule } from './api/image/image.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
const winston = require('winston');
require('winston-daily-rotate-file');

var fileRotateTransport = new (winston.transports.DailyRotateFile)({
  filename: '%DATE%.log',
  datePattern: 'DD-MM-YYYY',
  maxSize: '20m',
  dirname: logDir+'error/',
});

@Module({
  imports: [
    AuthModule,
    LocationModule,
    LocationCategoryModule,
    NewLocationModule,
    UserModule,
    PlanTripModule,
    RateLocationModule,
    SaveLocationModule,
    VisitLocationModule,
    ImageModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    ServeStaticModule.forRoot({
      serveRoot: '/public/',
      rootPath: assetsDir+ 'public/',
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/img/',
      rootPath: assetsDir+'img/',
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        fileRotateTransport,
        new winston.transports.Console(),
        new (winston.transports.DailyRotateFile)({
          filename: '%DATE%-error.log',
          datePattern: logDatePattern,
          maxSize: logFileMaxSize,
          dirname: logDir+'error/',
        }),
        new (winston.transports.DailyRotateFile)({
          filename: '%DATE%-debug.log',
          datePattern: logDatePattern,
          maxSize: logFileMaxSize,
          dirname: logDir+'debug/',
        }),
        new (winston.transports.DailyRotateFile)({
          filename: '%DATE%-info.log',
          datePattern: logDatePattern,
          maxSize: logFileMaxSize,
          dirname: logDir+'info/',
        }),
      ],
    }),
  ],
  // controllers: [AppController],
  //providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthService)
      .exclude({ path: '/', method: RequestMethod.ALL });
    //  .forRoutes({path: '/api/*', method: RequestMethod.ALL}) //TODO: abilitare
  }
}
