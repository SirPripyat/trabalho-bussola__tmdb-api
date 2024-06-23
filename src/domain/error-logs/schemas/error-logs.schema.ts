import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ErrorLogsDocument = HydratedDocument<ErrorLogs>;

@Schema({ timestamps: true })
export class ErrorLogs {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  message: string;
}

export const ErrorLogsSchema = SchemaFactory.createForClass(ErrorLogs);
