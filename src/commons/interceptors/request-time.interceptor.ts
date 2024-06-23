import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestTimeInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        this.logger.log(
          `Request to ${request.url} took ${responseTime}ms to complete on ${response.statusCode} status code.`,
        );
      }),
    );
  }
}
