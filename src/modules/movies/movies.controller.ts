import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import StatusCodes from "http-status-codes";
import { MovieServices } from "./movies.service";

const createMovie = catchAsync(async (req, res, next) => {
  const result = await MovieServices.createMovieIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "successfully created movie",
    data: result,
  });
});

export const MovieController = {
  createMovie,
};
