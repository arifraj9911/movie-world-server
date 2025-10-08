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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieServices = void 0;
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const movies_model_1 = require("./movies.model");
const createMovieIntoDB = (posterFile, topCastFiles, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (posterFile) {
            const imageName = `${payload.title}-poster`;
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, posterFile.path);
            payload.poster = secure_url;
        }
        if (payload.topCast && Array.isArray(payload.topCast)) {
            for (let i = 0; i < payload.topCast.length; i++) {
                const castMember = payload.topCast[i];
                const file = topCastFiles[i];
                if (file) {
                    const imageName = `${payload.title}-topCast-${i}`;
                    const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
                    castMember.image = secure_url;
                }
            }
        }
        console.log("Final payload before DB create:", payload);
        const result = yield movies_model_1.Movie.create(payload);
        return result;
    }
    catch (error) {
        console.error("Database create error:", error);
        throw new Error("Failed to create movie in the database");
    }
});
const getMovieFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield movies_model_1.Movie.find();
        return result;
    }
    catch (error) {
        throw new Error("Failed to fetch movies from the database");
    }
});
const getSingleMovieFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield movies_model_1.Movie.findById(id);
        return result;
    }
    catch (error) {
        throw new Error("Failed to fetch single movie from the database");
    }
});
const updateMoviesIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatePayload = {};
        const processNestedFields = (object, parentKey = "") => {
            Object.keys(object).forEach((key) => {
                const fullKey = parentKey ? `${parentKey}.${key}` : key;
                if (typeof object[key] === "object" && object[key] !== null) {
                    // Recursively process nested objects
                    processNestedFields(object[key], fullKey);
                }
                else {
                    // For non-object fields, add them to the updatePayload
                    updatePayload[fullKey] = object[key];
                }
            });
        };
        // Check if 'Movie' exists in payload and process it
        processNestedFields(payload);
        const result = yield movies_model_1.Movie.findByIdAndUpdate(id, { $set: updatePayload }, { new: true });
        if (!result) {
            throw new Error("Movie not found");
        }
        // console.log(result);
        return result;
    }
    catch (error) {
        throw new Error(error.message || "Failed to update the movie");
    }
});
const deleteMovieFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteMovie = yield movies_model_1.Movie.findByIdAndDelete(id, { isDeleted: true });
        if (!deleteMovie) {
            throw new Error("Failed to delete Student");
        }
        return { message: "Movie Deleted Successfully" };
    }
    catch (error) {
        throw new Error(error.message || "Failed to Delete Movie");
    }
});
const updateWatchStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield movies_model_1.Movie.findByIdAndUpdate(id, { $set: { isWatched: true } }, { new: true });
        if (!result) {
            throw new Error("Movie not found");
        }
        // console.log(result);
        return result;
    }
    catch (error) {
        throw new Error(error.message || "Failed to update the status");
    }
});
exports.MovieServices = {
    createMovieIntoDB,
    getMovieFromDB,
    getSingleMovieFromDB,
    updateMoviesIntoDB,
    deleteMovieFromDB,
    updateWatchStatus
};
