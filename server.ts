import Koa from "koa";
import { startDatabase } from "./src/infra/database/Mongo";
import userRoutes from "./src/presentation/routes/UsersRoutes";


const app = new Koa();

startDatabase()

app.use(userRoutes.routes())
app.use(async (ctx) => {
  ctx.body = "Hello from Koa + TypeScript!";
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
