import express, { Application } from "express";
import { Middleware } from "../typescript/types";
import { Controllers } from "../typescript/interface";
class App {
  port: number;
  app: Application;
  constructor(appInit: {
    port: number;
    controllers: Array<Controllers>;
    middlewares: Array<Middleware>;
  }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middlewares);
    this.controllers(appInit.controllers);
  }

  async listen() {
    try {
      this.app.listen(this.port, () => {
        console.log(`app is listen on port ${this.port}`);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  private middlewares(middlewares: Array<Middleware>) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private controllers(controllers: Array<Controllers>) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }
}

export default App;
