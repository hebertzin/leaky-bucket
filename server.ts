import { KoaApp } from "./KoaApp";
import dotenv from "dotenv";
import { startDatabase } from "./src/infra/database/Mongo";
dotenv.config();

const PORT = process.env.PORT || 3000;

startDatabase()

async function bootstrap() {
  const app = new KoaApp();
  await app.init();
  app.start(3000);
}

bootstrap().catch(console.error);
