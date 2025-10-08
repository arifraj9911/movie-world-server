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
const allowedOrigins = [
  "https://movie-world-client.vercel.app", // live client
  "http://localhost:3000", // dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

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
