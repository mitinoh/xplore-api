import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { MONGO_CONNECTION, assetDir, pth,logConf } from './app.properties';
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
import { ImageModule } from './api/image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
const winston = require('winston');
require('winston-daily-rotate-file');


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
      // http://localhost:3000/asset/location/test.jpg
      serveRoot: '/'+assetDir.location,
      rootPath: pth.location,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/'+assetDir.badge,
      rootPath: pth.badge,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new (winston.transports.DailyRotateFile)({
          filename: '%DATE%-error.log',
          datePattern: logConf.logDatePattern,
          maxSize: logConf.logFileMaxSize,
          dirname: pth.err,
        }),
        new (winston.transports.DailyRotateFile)({
          filename: '%DATE%-debug.log',
          datePattern: logConf.logDatePattern,
          maxSize: logConf.logFileMaxSize,
          dirname: pth.debug,
        }),
        new (winston.transports.DailyRotateFile)({
          filename: '%DATE%-info.log',
          datePattern: logConf.logDatePattern,
          maxSize: logConf.logFileMaxSize,
          dirname: pth.info,
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
