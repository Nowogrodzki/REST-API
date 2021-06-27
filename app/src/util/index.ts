import { Response } from "express";
import { Movie, IList } from "../typescript/interface";

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

export { handleResponse, handleListResponse };
