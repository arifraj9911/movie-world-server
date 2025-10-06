import { IMovie } from "./movies.interface";
import { Movie } from "./movies.model";

const createMovieIntoDB = async (payload: IMovie) => {
  const result = await Movie.create(payload);
  return result;
};

export const MovieServices = {
  createMovieIntoDB,
};