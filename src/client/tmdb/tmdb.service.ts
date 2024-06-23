import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TMDB_BASE_URL } from '../../constants/tmdb-base-url.constant';
import * as process from 'node:process';
import { LanguagesEnum } from './enums/languages.enum';
import { map } from 'rxjs';
import { TmdbMovieResultsDto } from './dto/tmdb-movie-results.dto';

@Injectable()
export class TmdbService {
  constructor(private readonly httpService: HttpService) {}

  findAllMovies(search: string) {
    const url = this.buildUrl('search/movie');
    const params = this.buildParams({ query: search });

    return this.httpService
      .get<TmdbMovieResultsDto>(url, {
        params: params,
      })
      .pipe(map((response) => response.data));
  }

  private buildUrl(path: string) {
    return TMDB_BASE_URL + '/' + path;
  }

  private buildParams(params: Record<string, string>) {
    return {
      ...params,
      api_key: process.env.TMDB_API_KEY,
      language: LanguagesEnum.PT_BR,
    };
  }
}
