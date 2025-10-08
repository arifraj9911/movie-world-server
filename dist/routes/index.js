"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_route_1 = require("../modules/movies/movies.route");
const router = (0, express_1.Router)();
const routerModule = [
    {
        path: "/movies",
        route: movies_route_1.MovieRoutes,
    },
];
routerModule.forEach((route) => router.use(route.path, route.route));
exports.default = router;
