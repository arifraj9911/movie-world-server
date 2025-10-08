import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { IMovie } from "./movies.interface";
import { Movie } from "./movies.model";

const createMovieIntoDB = async (
  posterFile: any,
  topCastFiles: any[],
  payload: IMovie
) => {
  try {
    if (posterFile) {
      const imageName = `${payload.title}-poster`;
      const { secure_url } = await sendImageToCloudinary(
        imageName,
        posterFile.path
      );
      payload.poster = secure_url;
    }

    if (payload.topCast && Array.isArray(payload.topCast)) {
      for (let i = 0; i < payload.topCast.length; i++) {
        const castMember = payload.topCast[i];
        const file = topCastFiles[i];

        if (file) {
          const imageName = `${payload.title}-topCast-${i}`;
          const { secure_url } = await sendImageToCloudinary(
            imageName,
            file.path
          );
          castMember.image = secure_url;
        }
      }
    }

    console.log("Final payload before DB create:", payload);
    const result = await Movie.create(payload);
    return result;
  } catch (error: any) {
    console.error("Database create error:", error);
    throw new Error("Failed to create movie in the database");
  }
};

const getMovieFromDB = async () => {
  try {
    const result = await Movie.find();
    return result;
  } catch (error) {
    throw new Error("Failed to fetch movies from the database");
  }
};

const getSingleMovieFromDB = async (id: string) => {
  try {
    const result = await Movie.findById(id);
    return result;
  } catch (error) {
    throw new Error("Failed to fetch single movie from the database");
  }
};

const updateMoviesIntoDB = async (id: string, payload: Partial<IMovie>) => {
  try {
    const updatePayload: any = {};

    const processNestedFields = (object: any, parentKey: string = "") => {
      Object.keys(object).forEach((key) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof object[key] === "object" && object[key] !== null) {
          // Recursively process nested objects
          processNestedFields(object[key], fullKey);
        } else {
          // For non-object fields, add them to the updatePayload
          updatePayload[fullKey] = object[key];
        }
      });
    };

    // Check if 'Movie' exists in payload and process it
    processNestedFields(payload);

    const result = await Movie.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true }
    );

    if (!result) {
      throw new Error("Movie not found");
    }

    // console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update the movie");
  }
};

const deleteMovieFromDB = async (id: string) => {
  try {
    const deleteMovie = await Movie.findByIdAndDelete(id, { isDeleted: true });
    if (!deleteMovie) {
      throw new Error("Failed to delete Student");
    }

    return { message: "Movie Deleted Successfully" };
  } catch (error: any) {
    throw new Error(error.message || "Failed to Delete Movie");
  }
};

const updateWatchStatus = async (id: string) => {
  try {
    const result = await Movie.findByIdAndUpdate(
      id,
      { $set: { isWatched: true } },
      { new: true }
    );

    if (!result) {
      throw new Error("Movie not found");
    }

    // console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update the status");
  }
};

export const MovieServices = {
  createMovieIntoDB,
  getMovieFromDB,
  getSingleMovieFromDB,
  updateMoviesIntoDB,
  deleteMovieFromDB,
  updateWatchStatus
};
