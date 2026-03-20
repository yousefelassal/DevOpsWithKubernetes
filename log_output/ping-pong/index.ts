let counter = 0;

const server = Bun.serve({
  port: 3004,
  routes: {
    "/pingpong": () => {
      console.log(`${new Date().toISOString()} - ping received: ${counter}`);
      return new Response(`pong ${counter++}`);
    },
  },
});

console.log(`Server running at ${server.url}`);
