import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { logger } from "@rasla/logify";

export const app = new Elysia()
  .use(await staticPlugin({ prefix: "/" }))
  .use(openapi({ references: fromTypes() }))
  .use(logger())
  .get("/message", { message: "Hello from server" } as const)
  .listen(process.env.PORT || 3000);

console.log(
  `Server started at ${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`
);
