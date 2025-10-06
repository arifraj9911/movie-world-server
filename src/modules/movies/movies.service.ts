import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { IMovie } from "./movies.interface";
import { Movie } from "./movies.model";

const createMovieIntoDB = async (file: any, payload: IMovie) => {
  if (file) {
    const imageName = `${payload.title}`;
    const filePath = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, filePath);
    payload.poster = secure_url;
  }

  const result = await Movie.create(payload);
  return result;
};

export const MovieServices = {
  createMovieIntoDB,
};
