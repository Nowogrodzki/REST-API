import { Request, Response } from "express";
import { pool } from "../db/index";
import { IAddComment, Movie, BodyId } from "../typescript/interface";
import { handleResponse, handleListResponse } from "../util/index";
import fetch from "node-fetch";

const handleHomeRoute = (request: Request, response: Response) => {
  return response.send(`<h1>REST-API SERVICE IS UP`);
};

const createMovieByTitle = async (request: Request, response: Response) => {
  try {
    const { title }: { title: string } = request.body;
    const url = `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDb_API_KEY!}`;
    const resp = await fetch(url);
    const data: Movie = await resp.json();
    if (data.Error) {
      return handleResponse(response, false, data.Error);
    }
    await pool.insertMovie(data);
    return handleResponse(response, true, "Record successly created");
  } catch (e) {
    return handleResponse(response, false, e.message);
  }
};

const listMovies = async (request: Request, response: Response) => {
  try {
    const { id }: BodyId = request.body;
    if (id) {
      const filteredData = await pool.listMovies(id);
      return handleListResponse(response, true, filteredData);
    }
    return handleListResponse(response, true, await pool.listMovies());
  } catch (e) {
    return handleResponse(response, false, e.message);
  }
};

const addComment = async (request: Request, response: Response) => {
  try {
    const { comment, id }: IAddComment = request.body;
    await pool.insertComment(comment, id);
    return handleResponse(response, true, "Comment successly added to the movie");
  } catch (e) {
    return handleResponse(response, false, e.message);
  }
};

const listComments = async (request: Request, response: Response) => {
  try {
    const { id }: BodyId = request.body;
    if (id) {
      const filteredData = await pool.listComments(id);
      return handleListResponse(response, true, filteredData);
    }
    return handleListResponse(response, true, await pool.listComments());
  } catch (e) {
    return handleResponse(response, false, e.message);
  }
};
export { handleHomeRoute, createMovieByTitle, listMovies, addComment, listComments };
