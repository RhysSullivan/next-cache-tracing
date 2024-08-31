import Image from "next/image";
import { action } from "./action";
import { ActionButton } from "./client";
export const revalidate = 0;

async function Pokemon() {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
    cache: "force-cache",
    next: {
      tags: ["pokemon"],
    },
  });
  const pokemon = await data.json();
  return <div>{pokemon.name}</div>;
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ActionButton />
      <Pokemon />
      <Pokemon />
      <Pokemon />
      <Pokemon />
      <Pokemon />
    </main>
  );
}
