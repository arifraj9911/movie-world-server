import { Router } from "express";
import { MovieRoutes } from "../modules/movies/movies.route";

const router = Router();

const routerModule = [
  {
    path: "/movies",
    route: MovieRoutes,
  },
];

routerModule.forEach((route) => router.use(route.path, route.route));

export default router;
