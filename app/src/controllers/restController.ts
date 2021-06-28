import { Router } from "express";
import { handleHomeRoute, createMovieByTitle, listMovies, addComment, listComments } from "./logic";

class RestController {
  router = Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", handleHomeRoute);
    this.router.get("/list-movie", listMovies);
    this.router.get("/list-comments", listComments);
    this.router.post("/add-movie", createMovieByTitle);
    this.router.patch("/add-comment", addComment);
  }
}

export default RestController;
