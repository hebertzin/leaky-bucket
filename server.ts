import Koa from "koa";

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello from Koa + TypeScript!";
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
