import express from "express";
import { MovieController } from "./movies.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post("/create", upload.single("file"), MovieController.createMovie);

export const MovieRoutes = router;
