"use server";
import { trace } from "@opentelemetry/api";

export async function action() {
  console.log("hello from action", new Date());
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
    cache: "force-cache",
  });
  return data.json();
}
