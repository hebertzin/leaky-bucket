import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { setupUserRoutes } from "./src/presentation/routes/UsersRoutes";

export class KoaApp {
  private koaApp: Koa;

  constructor() {
    this.koaApp = new Koa();
  }

  public async init(): Promise<void> {
    //  parser post request
    this.koaApp.use(bodyParser());

    const userRoutes = await setupUserRoutes();

    this.koaApp.use(userRoutes.routes());

  }

  public start(port: number): void {
    this.koaApp.listen(port, () => {
      console.log(`Koa server running on port ${port}`);
    });
  }

  public getApp(): Koa {
    return this.koaApp;
  }
}
