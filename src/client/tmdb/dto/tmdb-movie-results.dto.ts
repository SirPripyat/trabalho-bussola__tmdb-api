import { IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TmdbMovieDto } from './tmdb-movie.dto';

export class TmdbMovieResultsDto {
  @IsInt()
  page: number;

  @ValidateNested({ each: true })
  @Type(() => TmdbMovieDto)
  results: TmdbMovieDto[];

  @IsInt()
  total_pages: number;

  @IsInt()
  total_results: number;
}
