import mongoose, { Schema } from "mongoose";
import { IMovie, ITopCast } from "./movies.interface";

// TopCast Schema
const TopCastSchema = new Schema<ITopCast>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    episode: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { _id: false }
);

// Movie Schema
const MovieSchema = new Schema<IMovie>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    description: { type: String, required: true },
    creators: { type: [String], required: true },
    stars: { type: [String], required: true },
    genre: { type: [String], default: [] },
    releaseYear: { type: Number, required: true },
    episodes: { type: Number, required: true },
    videos: { type: Number, required: true },
    photos: { type: Number, required: true },
    rating: { type: Number, required: true },
    ratingCount: { type: Number, required: true },
    language: { type: String, required: true },
    country: { type: String },
    duration: { type: String },
    youtubeUrl: { type: String, required: true },
    topCast: { type: [TopCastSchema], required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Movie = mongoose.model<IMovie>("Movie", MovieSchema);
