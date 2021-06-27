import express from "express";
import cors from "cors";
import App from "./src/service/app";
import RestController from "./src/controllers/restController";
import { config as dotenv } from "dotenv";
dotenv();

const app = new App({
  port: Number(process.env.EXPRESS_PORT),
  controllers: [new RestController()],
  middlewares: [express.urlencoded({ extended: true }), express.json(), cors()],
});

app.listen();
