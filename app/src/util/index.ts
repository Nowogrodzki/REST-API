import { Response } from "express";
import {Movie, IList} from "../typescript/interface";
import fetch from "node-fetch";

const consumer = async (phraseOrTitle:any) => {
    const url = `http://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}&t=${phraseOrTitle}`;
    const resp = await fetch(url);
    const data: Movie = await resp.json();
    return data
}

const handleResponse = (response: Response, status: boolean, message: string | Movie[]) => {
  const data = { status, message };
  if (status) {
    return response.json(data);
  }
  return response.json(data);
};

const handleListResponse = (response: Response, status: boolean, message: IList) => {
  const data = { status, message };
  if (status) {
    return response.json(data);
  }
  return response.json(data);
};

export { handleResponse, handleListResponse, consumer };
