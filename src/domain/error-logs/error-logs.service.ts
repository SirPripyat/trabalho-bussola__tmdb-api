import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorLogs, ErrorLogsDocument } from './schemas/error-logs.schema';
import { Model } from 'mongoose';
import { ErrorLogDto } from './dto/error-log.dto';

@Injectable()
export class ErrorLogsService {
  constructor(
    @InjectModel(ErrorLogs.name) private errorLogsModel: Model<ErrorLogs>,
  ) {}

  public async create(errorLogDto: ErrorLogDto): Promise<ErrorLogsDocument> {
    const createdErrorLog = new this.errorLogsModel(errorLogDto);
    return createdErrorLog.save();
  }
}
