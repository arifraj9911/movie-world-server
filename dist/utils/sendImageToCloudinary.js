"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
// Configuration
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const sendImageToCloudinary = (imageName, filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload(filePath, {
            public_id: imageName,
        })
            .then((uploadResult) => {
            console.log(uploadResult);
            // Optimize delivery
            const optimizeUrl = cloudinary_1.v2.url(imageName, {
                fetch_format: "auto",
                quality: "auto",
            });
            console.log(optimizeUrl);
            // Transform the image
            const autoCropUrl = cloudinary_1.v2.url(imageName, {
                crop: "auto",
                gravity: "auto",
                width: 500,
                height: 500,
            });
            console.log(autoCropUrl);
            resolve(uploadResult);
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("file is deleted");
                }
            });
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
// Upload directory setup
const uploadDir = path_1.default.join(process.cwd(), "uploads/");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// Multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage });
