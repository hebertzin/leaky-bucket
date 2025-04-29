import { KoaApp } from "./KoaApp";
import { startDatabase } from "./src/infra/database/Mongo";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    const db = await startDatabase();
    const app = new KoaApp(db);
    app.start(PORT);
  } catch (error) {
    process.exit(1);
  }
}

bootstrap();
