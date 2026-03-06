import { Console, Effect, Schedule } from "effect";

const hash = crypto.randomUUID();

// print the hash every second for as long as the process is running
const tick = Effect.gen(function* () {
  yield* Console.log(`${new Date().toISOString()}: ${hash}`);
});

const main = Effect.repeat(tick, Schedule.spaced("1 second"));

Effect.runPromise(main);
