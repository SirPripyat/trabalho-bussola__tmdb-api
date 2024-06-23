import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IVote } from '../interfaces/vote.interface';
import { Vote } from './vote.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  originalTitle: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  overview: string;

  @Prop({ required: true })
  originalLanguage: string;

  @Prop({ required: true })
  genreIds: number[];

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true, type: Vote })
  vote: IVote;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
