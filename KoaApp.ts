import Koa from "koa";
import { Db } from "mongodb";
import userRoutes from "./src/presentation/routes/UsersRoutes";

export class KoaApp {
  private koaApp: Koa;
  readonly db: Db;

  constructor(db: Db) {
    this.koaApp = new Koa();
    this.db = db;

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    // to  be defined
  }

  private routes(): void {
    this.koaApp.use(userRoutes.routes());
  }

  public start(port: number | string): void {
    this.koaApp.listen(port, () => {
      console.log(`Koa server running on port ${port}`);
    });
  }

  public getApp(): Koa {
    return this.koaApp;
  }
}
