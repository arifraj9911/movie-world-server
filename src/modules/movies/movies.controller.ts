import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import StatusCodes from "http-status-codes";
import { MovieServices } from "./movies.service";

const createMovie = catchAsync(async (req, res, next) => {
  const payload = { ...req.body };
  const jsonFields = ["creators", "stars", "genre", "tags", "topCast"];
  jsonFields.forEach((field) => {
    if (payload[field]) {
      try {
        payload[field] = JSON.parse(payload[field]);
      } catch (err) {
        return next(new Error(`Invalid JSON format for field ${field}`));
      }
    }
  });
  const files = req.files as Record<string, Express.Multer.File[]>;

  const posterFile = files?.poster?.[0];
  const topCastFiles = files?.topCastImages || [];

  const result = await MovieServices.createMovieIntoDB(
    posterFile,
    topCastFiles,
    payload
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "successfully created movie",
    data: result,
  });
});

const getMovie = catchAsync(async (req, res, next) => {
  const result = await MovieServices.getMovieFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "successfully retrieved movies",
    data: result,
  });
});

const getSingleMovie = catchAsync(async (req, res, next) => {
  const result = await MovieServices.getSingleMovieFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "successfully retrieved single movies",
    data: result,
  });
});

const updateMovie = catchAsync(async (req, res, next) => {
  const result = await MovieServices.updateMoviesIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "successfully updated movie",
    data: result,
  });
});
const deleteMovie = catchAsync(async (req, res, next) => {
  const result = await MovieServices.deleteMovieFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "successfully deleted movie",
    data: result,
  });
});

export const MovieController = {
  createMovie,
  getMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
};
