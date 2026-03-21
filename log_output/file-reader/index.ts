const logFilePath = "./files/log.txt";
const logFile = Bun.file(logFilePath);

const server = Bun.serve({
  port: 3003,
  routes: {
    "/": () => {
      console.log(
        `${new Date().toISOString()} - Received request for log file`,
      );
      return new Response(logFile);
    },
  },
});

console.log(`Server running at ${server.url}`);
