import { Router } from "express";
import { homeRoute, createMovieByTitle, listMovies, addComment, listComments } from "./logic";
class RestController {
  path = "/";
  router = Router();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(this.path, homeRoute);
    this.router.get(`${this.path}list-movies`, listMovies);
    this.router.get(`${this.path}list-comments`, listComments);
    this.router.post(`${this.path}create-movie`, createMovieByTitle);
    this.router.patch(`${this.path}add-comment`, addComment);
  }
}

export default RestController;
