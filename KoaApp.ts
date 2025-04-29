import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { setupUserRouter } from "./src/presentation/routes/UsersRoutes";
import { setupAuthenticationRouter } from "./src/presentation/routes/AuthenticationRoutes";

export class KoaApp {
  private koaApp: Koa;

  constructor() {
    this.koaApp = new Koa();
  }

  public async init(): Promise<void> {
    //  parser post request
    this.koaApp.use(bodyParser());

    const authenticationRouter = await setupAuthenticationRouter()
    const userRouter = await setupUserRouter();

    this.koaApp.use(authenticationRouter.routes())
    this.koaApp.use(userRouter.routes());

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
