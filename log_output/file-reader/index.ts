const logFilePath = "./files/log.txt";
const logFilePathCount = "./files/count.txt";

const server = Bun.serve({
  port: 3003,
  routes: {
    "/": async () => {
      // log the request to the console
      console.log(
        `${new Date().toISOString()} - Received request for log file`,
      );
      
      // create file objects for the log file and the count log file
      const logFile = Bun.file(logFilePath);
      const logFileCount = Bun.file(logFilePathCount);

      // check if files exists
      const logFileExists = await logFile.exists();
      const logFileCountExists = await logFileCount.exists();

      // create the content to return in the response
      let content = "";

      // read the content of the log file if it exists, otherwise return a message indicating that there are no logs yet
      if (logFileExists) {
        content += `${await logFile.text()}\n`;
      } else {
        content += "No logs yet.\n";
      }

      // read the content of the count log file if it exists, otherwise return a message indicating that there are no count logs yet
      if (logFileCountExists) {
        content += `${await logFileCount.text()}`;
      } else {
        content += "No count logs yet.";
      }

      // return the content of the log file in the response
      return new Response(content);
    },
  },
});

console.log(`Server running at ${server.url}`);
