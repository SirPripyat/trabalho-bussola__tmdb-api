import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema()
export class Vote {
  @Prop({ required: true })
  average: number;

  @Prop({ required: true })
  count: number;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
