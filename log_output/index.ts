import { Console, Effect, Schedule } from "effect";

const hash = crypto.randomUUID();

const logFilePath = "./files/log.txt";
const logFile = Bun.file(logFilePath);

// print the hash every second for as long as the process is running
const tick = Effect.gen(function* () {
  // create the log content with the current timestamp and the hash
  const logContent = `${new Date().toISOString()}: ${hash}`;

  // write the log content to a file
  yield* Effect.tryPromise(async () => {
    await Bun.write(logFile, logContent);
  });

  // print the log content to the console
  yield* Console.log(logContent);
});

const main = Effect.repeat(tick, Schedule.spaced("1 second"));

Effect.runPromise(main);
