import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLogs, ErrorLogsSchema } from './schemas/error-logs.schema';
import { ErrorLogsService } from './error-logs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ErrorLogs.name,
        schema: ErrorLogsSchema,
      },
    ]),
  ],
  providers: [ErrorLogsService],
  exports: [ErrorLogsService],
})
export class ErrorLogsModule {}
