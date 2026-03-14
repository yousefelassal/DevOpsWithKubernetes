import tailwind from "bun-plugin-tailwind";

async function build() {
  // build frontend assets for the browser
  const frontendResult = await Bun.build({
    entrypoints: ["./public/index.html"],
    compile: true,
    target: "browser",
    outdir: "./dist/public",
    plugins: [tailwind],
    minify: true,
  });

  if (!frontendResult.success) {
    console.error("Build failed:");
    for (const log of frontendResult.logs) {
      console.error(log);
    }
  } else {
    console.log("Built:", frontendResult.outputs[0].path);
  }

  // build server binary
  const serverResult = await Bun.build({
    entrypoints: ["./src/index.ts"],
    compile: {
      autoloadTsconfig: true,
      outfile: "./dist/server",
    },
    target: "bun",
    minify: true,
  });

  if (!serverResult.success) {
    console.error("Build failed:");
    for (const log of serverResult.logs) {
      console.error(log);
    }
  } else {
    console.log("Built:", serverResult.outputs[0].path);
  }
}

build();