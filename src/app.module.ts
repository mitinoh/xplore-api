import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { configuration } from 'config/configuration';
import { WinstonModule } from 'nest-winston';
import { FollowerModule } from './api/follower/follower.module';
import { ImageModule } from './api/image/image.module';
import { LocationCategoryModule } from './api/location-category/location-category.module';
import { LocationModule } from './api/location/location.module';
import { NewLocationModule } from './api/new-location/new-location.module';
import { PlanTripModule } from './api/plan-trip/plan-trip.module';
import { RateLocationModule } from './api/rate-location/rate-location.module';
import { SaveLocationModule } from './api/save-location/save-location.module';
import { UserReportModule } from './api/user-report/user-report.module';
import { UserModule } from './api/user/user.module';
import { VisitLocationModule } from './api/visit-location/visit-location.module';
import { AuthModule } from './auth/auth.module';
import { assetDir, logConf, pth } from './app.properties';
import { AuthService } from './auth/auth.service';
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
    FollowerModule,
    ImageModule,
    UserReportModule,

    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
    }),

    MongooseModule.forRoot(process.env.MONGO_CONNECTION, { autoIndex: true }),

    ServeStaticModule.forRoot({
      // http://localhost:3000/asset/location/test.jpg
      serveRoot: '/' + assetDir.location,
      rootPath: pth.location,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/' + assetDir.badge,
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
