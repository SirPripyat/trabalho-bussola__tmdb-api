import { Injectable } from '@nestjs/common';
import { TmdbService } from '../../client/tmdb/tmdb.service';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { TmdbMovieDto } from '../../client/tmdb/dto/tmdb-movie.dto';
import { MovieDto } from './dto/movie.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(
    private readonly tmdbService: TmdbService,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  async create(movie: string) {
    const { results } = await firstValueFrom(
      this.tmdbService.findAllMovies(movie),
    );

    const filteredMovies = await Promise.all(
      results.map(async (movie) => {
        const existingMovie = await this.findOne(movie.id);
        return existingMovie ? null : this.buildMovieData(movie);
      }),
    );

    const moviesToSave = filteredMovies.filter(Boolean); // Remove null values
    return this.saveMovie(moviesToSave);
  }

  findAll() {
    return this.movieModel.find();
  }

  findOne(id: number) {
    return this.movieModel.findOne({
      id,
    });
  }

  remove(id: number) {
    return this.movieModel.findOneAndDelete({
      id,
    });
  }

  private buildMovieData({
    original_title,
    title,
    id,
    overview,
    original_language,
    genre_ids,
    release_date,
    vote_average,
    vote_count,
  }: TmdbMovieDto): MovieDto {
    return {
      originalTitle: original_title,
      title,
      id,
      overview,
      originalLanguage: original_language,
      genreIds: genre_ids,
      releaseDate: release_date,
      vote: {
        average: vote_average,
        count: vote_count,
      },
    };
  }

  private async saveMovie(movie: MovieDto[]) {
    return await this.movieModel.insertMany(movie);
  }
}
