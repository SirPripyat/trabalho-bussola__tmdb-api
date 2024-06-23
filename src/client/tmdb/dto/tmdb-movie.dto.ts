import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TmdbMovieDto {
  @IsBoolean()
  adult: boolean;

  @IsOptional()
  @IsString()
  backdrop_path?: string | null;

  @IsInt({ each: true })
  genre_ids: number[];

  @IsInt()
  id: number;

  @IsString()
  original_language: string;

  @IsString()
  original_title: string;

  @IsString()
  overview: string;

  @IsNumber()
  popularity: number;

  @IsString()
  poster_path: string;

  @IsString()
  release_date: string;

  @IsString()
  title: string;

  @IsBoolean()
  video: boolean;

  @IsNumber()
  vote_average: number;

  @IsInt()
  vote_count: number;
}
