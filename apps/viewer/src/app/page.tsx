import { CacheSystemDiagram } from "./components";
import { mockData } from "./mock-data";

export default function Home() {
  const fetches = mockData.filter(
    (span) =>
      "next.span_name" in span.tags &&
      span.tags["next.span_name"] ===
        "fetching hello this is a test to see what happens GET https://pokeapi.co/api/v2/pokemon/ditto"
  );
  console.log(fetches, fetches.length);
  return <CacheSystemDiagram />;
}
