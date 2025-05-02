import { KoaApp } from "./KoaApp";
import dotenv from "dotenv";
import { startDatabase } from "./src/infra/database/Mongo";
import { env } from "./src/infra/env/Env";
dotenv.config();

const PORT = process.env.PORT || 3000;

startDatabase()

async function bootstrap() {
  const app = new KoaApp();
  await app.init();
  app.start(env.PORT);
}

bootstrap().catch(console.error);
