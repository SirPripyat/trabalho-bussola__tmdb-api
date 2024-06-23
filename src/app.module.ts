import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestTimeInterceptor } from './commons/interceptors/request-time.interceptor';
import { LoggingError } from './commons/interceptors/logging-error.interceptor';
import { ErrorLogsModule } from './domain/error-logs/error-logs.module';
import { MovieModule } from './domain/movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL + '/tmdb-api'),
    UserModule,
    AuthModule,
    ErrorLogsModule,
    MovieModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestTimeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingError,
    },
  ],
})
export class AppModule {}
