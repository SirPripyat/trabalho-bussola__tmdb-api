import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VoteDto } from './vote.dto';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  originalTitle: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsString()
  @IsNotEmpty()
  originalLanguage: string;

  @IsArray()
  @IsNotEmpty()
  genreIds: number[];

  @IsDate()
  @IsNotEmpty()
  releaseDate: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => VoteDto)
  vote: VoteDto;
}
