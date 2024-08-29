"use server";
import { trace } from "@opentelemetry/api";

export async function action() {
  console.log("hello from action", new Date());
  return await trace
    .getTracer("next.js", "0.0.1")
    .startActiveSpan("fetchGithubStars", async (span) => {
      try {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
          cache: "force-cache",
        });
        return data.json();
      } finally {
        span.end();
      }
    });
}
