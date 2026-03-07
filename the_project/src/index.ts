import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { configure, getConsoleSink } from "@logtape/logtape";
import { elysiaLogger } from "@logtape/elysia";

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: ["elysia"], sinks: ["console"], lowestLevel: "info" }
  ],
});

export const app = new Elysia()
  .use(openapi({ references: fromTypes() }))
  .use(await staticPlugin({ prefix: "/" }))
  .use(elysiaLogger())
  .get("/message", { message: "Hello from server" } as const)
  .listen(process.env.PORT || 3000);

console.log(
  `Server started at ${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`
);
