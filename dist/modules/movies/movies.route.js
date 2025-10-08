"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRoutes = void 0;
const express_1 = __importDefault(require("express"));
const movies_controller_1 = require("./movies.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.post("/create", sendImageToCloudinary_1.upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "topCastImages", maxCount: 10 },
]), movies_controller_1.MovieController.createMovie);
router.get("/get", movies_controller_1.MovieController.getMovie);
router.get("/get/:id", movies_controller_1.MovieController.getSingleMovie);
router.patch("/update/:id", movies_controller_1.MovieController.updateMovie);
router.delete("/delete/:id", movies_controller_1.MovieController.deleteMovie);
router.patch("/watch-status/:id", movies_controller_1.MovieController.watchStatus);
exports.MovieRoutes = router;
