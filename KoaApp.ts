import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { ApolloServer } from "apollo-server-koa";
import { schema } from "./src/presentation/graphql/Index";
import { setupRouter } from "./src/presentation/routes/Routes";

export class KoaApp {
  private koaApp: Koa;
  private apolloServer: ApolloServer;

  constructor() {
    this.koaApp = new Koa();
    this.apolloServer = new ApolloServer({
      schema,
      context: ({ ctx }) => ctx
    });
  }

  public async init(): Promise<void> {
    this.koaApp.use(bodyParser());
    const router = await setupRouter()
    this.koaApp.use(router.routes())
    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({ app: this.koaApp });
  }

  public start(port: number): void {
    this.koaApp.listen(port, () => {
      console.log(`Koa server running on port ${port}`);
      console.log(`GraphQL server ready at http://localhost:${port}${this.apolloServer.graphqlPath}`);
    });
  }

  public getApp(): Koa {
    return this.koaApp;
  }
}
