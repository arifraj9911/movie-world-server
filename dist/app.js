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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// import { router } from "./routes";
// import globalErrorHandler from "./modules/middleware/globalErrorHandler";
// import notFoundRoute from "./modules/middleware/notFoundRoute";
// import router from "./routes";
// import cookieParser from "cookie-parser";
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
// app.use(cookieParser());
app.use((0, cors_1.default)({ origin: ["http://localhost:3000"], credentials: true }));
// application route
app.use("/api/v1", routes_1.default);
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "result send to database" });
});
app.get("/", test);
// global error handler middleware
// app.use(globalErrorHandler);
// not found route
// app.use(notFoundRoute);
exports.default = app;
