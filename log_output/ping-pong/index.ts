let counter = 0;

const server = Bun.serve({
  port: 3004,
  routes: {
    "/": () => new Response(`pong ${counter++}`),
  },
});

console.log(`Server running at ${server.url}`);
