import { Router } from "express";
import {
  handleHomeRoute,
  createMovieByTitle,
  listMovies,
  addComment,
  listComments,
} from "./logic";

class RestController {
  path = "/";
  router = Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(this.path, handleHomeRoute);
    this.router.get("/list-movie", listMovies);
    this.router.get("/list-comments", listComments);
    this.router.post("/add", createMovieByTitle);
    this.router.patch("/add-comment", addComment);
  }
}

export default RestController;
