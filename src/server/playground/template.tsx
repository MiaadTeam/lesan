import { serve } from "https://deno.land/std@0.128.0/http/server.ts";
import { renderToString } from "https://esm.sh/react-dom/server?deps=react@18.0.0";
import React from "https://esm.sh/react@v18.0.0";

const page = () => {
  const count = 0;
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>You clicked {count} times</p>
      {/* <button onClick={() => setCount(count + 1)}>Click me</button> */}
    </div>
  );
};

function handler(_req: Request): Response {
  const html = renderToString(page());
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

console.log("Listening on http://localhost:8000");
await serve(handler, { port: 8000 });
