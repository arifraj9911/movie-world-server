import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
// import { router } from "./routes";
// import globalErrorHandler from "./modules/middleware/globalErrorHandler";
// import notFoundRoute from "./modules/middleware/notFoundRoute";
// import router from "./routes";
// import cookieParser from "cookie-parser";
const app: Application = express();

// parser
app.use(express.json());
// app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000","https://movie-world-client.vercel.app"], credentials: true }));

// application route
app.use("/api/v1", router);


const test = async (req: Request, res: Response) => {
  res.json({ message: "result send to database" });
};

app.get("/", test);

// global error handler middleware
// app.use(globalErrorHandler);

// not found route
// app.use(notFoundRoute);

export default app;
