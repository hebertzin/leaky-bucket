import Koa from "koa";
import { startDatabase } from "./src/infra/database/Mongo";

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello from Koa + TypeScript!";
});

const PORT = process.env.PORT || 3000;

startDatabase()
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
