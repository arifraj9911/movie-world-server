import express from "express";
import { MovieController } from "./movies.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "topCastImages", maxCount: 10 },
  ]),
  MovieController.createMovie
);

router.get("/get", MovieController.getMovie);

router.get("/get/:id", MovieController.getSingleMovie);

router.patch("/update/:id", MovieController.updateMovie);

router.delete("/delete/:id", MovieController.deleteMovie);

router.patch("/watch-status/:id", MovieController.watchStatus);

export const MovieRoutes = router;
