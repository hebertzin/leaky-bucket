import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { setupUserRouter } from "./src/presentation/routes/UsersRoutes";
import { setupAuthenticationRouter } from "./src/presentation/routes/AuthenticationRoutes";
import { setupProtectedRouter } from "./src/presentation/routes/ProtectedRoutes";
import { leakyBucketMiddlewareFactory } from "./src/infra/factories/middlewares/LeakyBucketMiddlewareFactory";
import { authenticationMiddlewareFactory } from "./src/infra/factories/middlewares/AuthenticationMiddlewareFactory";

export class KoaApp {
  private koaApp: Koa;

  constructor() {
    this.koaApp = new Koa();
  }

  public async init(): Promise<void> {
    this.koaApp.use(bodyParser());

    
    const authenticationRouter = await setupAuthenticationRouter()
    const protectedRouter = await setupProtectedRouter();
    const userRouter = await setupUserRouter();

    const leakyBucketMiddleware = await leakyBucketMiddlewareFactory();
    const autenticationMiddleware =  authenticationMiddlewareFactory();

    this.koaApp.use(autenticationMiddleware)
    this.koaApp.use(leakyBucketMiddleware)

    this.koaApp.use(authenticationRouter.routes())
    this.koaApp.use(protectedRouter.routes())
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
