import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { MONGO_CONNECTION } from './app.properties';
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
import * as winston from 'winston';

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
    MongooseModule.forRoot(MONGO_CONNECTION),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname:  './../log/error/',
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: './../log/debug/', 
          filename: 'debug.log', 
          level: 'debug',
        }),
        new winston.transports.File({
          dirname:  './../log/info/',
          filename: 'info.log',
          level: 'info',
        }),
      ],
    }),
    
  ],
  // controllers: [AppController],
   //providers: [AuthService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthService)
        .exclude({path: '/', method: RequestMethod.ALL})
      //  .forRoutes({path: '/api/*', method: RequestMethod.ALL}) //TODO: abilitare
    }
}
