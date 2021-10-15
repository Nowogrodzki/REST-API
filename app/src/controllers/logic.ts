import { Request, Response } from "express";
import { pool } from "../db/index";
import { IAddComment, BodyId, BodyTitle } from "../typescript/interface";
import { handleResponse, handleListResponse, consumer } from "../util/index";

const homeRoute = (request: Request, response: Response) => {
  return response.json({ live: true, message: "REST-API is working" });
};

const removeOneOrMany = async (request: Request, response: Response) => {
  try {
    const { id } = request.body;
    await pool.delete(id);
    return response.json({ message: `removed id - ${id}`})
  } catch (e) {
    return handleResponse(response, false, e.message);
  }
}

const searchForMovie = async (request: Request, response: Response) => {
  try {
    const { phrase } = request.query;

    if (!phrase) {
      return response.json({ message: 'invalid parameter' });
    }

    return response.json(await consumer(phrase));
  } catch (e) {
    return handleResponse(response, false, e.message);
  }
}

const createMovieByTitle = async (request: Request, response: Response) => {
  try {
    const { title }: BodyTitle = request.body;
    if (!title) {
      return handleResponse(response, false, "Title is required and cannot be empty");
    }
    const data = await consumer(title);
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
    if (!id || !comment) {
      return handleResponse(response, false, "comment and id is required as parameters");
    }
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

export { homeRoute, createMovieByTitle, listMovies, addComment, listComments, searchForMovie, removeOneOrMany };
