// import { serve } from "https://deno.land/std@0.97.0/http/server.ts";
// import { serveFile } from "https://deno.land/std/http/file_server.ts";
//
// const server = serve({ port: 1366 });
//
// console.log(" Playgroud start at http://localhost:1366/ ");
//
// for await (const req of server) {
//   const path = `./playground/build/index.html`;
//   const content = await serveFile(req, path);
//   req.respond(content);
// }

import { Application } from "https://deno.land/x/abc@v1.3.1/mod.ts";

const app = new Application();

console.log(" Playgroud start at http://localhost:1366/ ");

app
  .static("/", "./playground/build")
  .file("/", "./playground/build/index.html")
  .start({ port: 1366 });

// import denoliver from "https://deno.land/x/denoliver/mod.ts";
// import { serve } from "https://deno.land/std@0.97.0/http/server.ts";
//
// const server = serve({ port: 1366 });
//
// console.log(" Playgroud start at http://localhost:1366/ ");
//
// for await (const req of server) {
//   const server = await denoliver({
//     port: 1366,
//     cors: true,
//     entryPoint: "./playground/public/index.html",
//   });
// }

// server.close(); // Close the server
