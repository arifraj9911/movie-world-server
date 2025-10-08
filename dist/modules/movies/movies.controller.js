"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const movies_service_1 = require("./movies.service");
const createMovie = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign({}, req.body);
    const jsonFields = ["creators", "stars", "genre", "tags", "topCast"];
    jsonFields.forEach((field) => {
        if (payload[field]) {
            try {
                payload[field] = JSON.parse(payload[field]);
            }
            catch (err) {
                return next(new Error(`Invalid JSON format for field ${field}`));
            }
        }
    });
    const files = req.files;
    const posterFile = (_a = files === null || files === void 0 ? void 0 : files.poster) === null || _a === void 0 ? void 0 : _a[0];
    const topCastFiles = (files === null || files === void 0 ? void 0 : files.topCastImages) || [];
    const result = yield movies_service_1.MovieServices.createMovieIntoDB(posterFile, topCastFiles, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "successfully created movie",
        data: result,
    });
}));
const getMovie = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movies_service_1.MovieServices.getMovieFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "successfully retrieved movies",
        data: result,
    });
}));
const getSingleMovie = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movies_service_1.MovieServices.getSingleMovieFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "successfully retrieved single movies",
        data: result,
    });
}));
const updateMovie = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movies_service_1.MovieServices.updateMoviesIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "successfully updated movie",
        data: result,
    });
}));
const deleteMovie = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movies_service_1.MovieServices.deleteMovieFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "successfully deleted movie",
        data: result,
    });
}));
const watchStatus = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movies_service_1.MovieServices.updateWatchStatus(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "successfully updated status",
        data: result,
    });
}));
exports.MovieController = {
    createMovie,
    getMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie,
    watchStatus,
};
