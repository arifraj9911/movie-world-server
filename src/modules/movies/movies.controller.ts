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
  const file = req.file;

  const result = await MovieServices.createMovieIntoDB(file, payload);

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
