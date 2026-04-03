let counter = 0;

const logFilePath = "./files/count.txt";

const server = Bun.serve({
  port: 3004,
  routes: {
    "/pingpong": async () => {
      // log the count to the console
      console.log(`${new Date().toISOString()} - ping received: ${counter}`);
      // write the count to a file
      try {
        const logFile = Bun.file(logFilePath);
        await Bun.write(logFile, `Ping / Pongs: ${counter}`);
      } catch (error) {
        console.error(`Error writing to log file: ${error}`);
      }
      // return the count in the response
      return new Response(`pong ${counter++}`);
    },
  },
});

console.log(`Server running at ${server.url}`);
