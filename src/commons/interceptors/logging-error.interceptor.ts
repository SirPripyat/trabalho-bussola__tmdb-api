import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorLogsService } from '../../domain/error-logs/error-logs.service';

@Injectable()
export class LoggingError implements NestInterceptor {
  private readonly logger = new Logger(LoggingError.name);

  constructor(private errorLogService: ErrorLogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const { method, url } = context.switchToHttp().getRequest();
        const status = error instanceof HttpException ? error.getStatus() : 500;
        const message = `Error on ${method} ${url} - Status: ${status}`;

        this.errorLogService.create({
          method,
          url,
          status,
          message,
        });

        this.logger.error(message, error.stack);

        return throwError(error);
      }),
    );
  }
}
