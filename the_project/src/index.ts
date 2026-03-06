import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .listen(process.env.PORT || 3000);

console.log(
  `Server started at ${app.server?.hostname}:${app.server?.port}`
);
