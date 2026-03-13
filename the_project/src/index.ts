import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { configure, getConsoleSink } from "@logtape/logtape";
import { elysiaLogger } from "@logtape/elysia";
import { getLogger } from "@logtape/logtape";

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: ["logtape", "meta"], sinks: ["console"], lowestLevel: "warning" },
    { category: ["elysia"], sinks: ["console"], lowestLevel: "trace" },
  ],
});

const logger = getLogger(["elysia", "index"]);

export const app = new Elysia()
  .use(openapi({ references: fromTypes() }))
  .use(await staticPlugin({ prefix: "/" }))
  .use(elysiaLogger())
  .get("/message", () => {
    logger.info("Message endpoint hit");
    return { message: "Hello from server" } as const;
  })
  .listen(process.env.PORT || 3000);

console.log(
  `Server started at ${app.server?.protocol}://${app.server?.hostname}:${app.server?.port}`,
);
