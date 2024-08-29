import Image from "next/image";
import { ingestor, SpanNode } from "./api/traces/types";
import { TraceTree } from "./trace-tree";
import { TreeViewElement } from "@/components/ui/tree-view-api";

function Span(props: SpanNode) {
  const { span, children } = props;
  console.log(props);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold">{span.name}</h2>
      {children.map((child) => {
        console.log(child);
        return <Span key={child.span.traceId} {...child} />;
      })}
    </div>
  );
}

function convertSpanNodeToTreeViewElement(span: SpanNode): TreeViewElement {
  return {
    id: span.span.traceId,
    name: span.span.name,
    isSelectable: true,
    children: span.children.map(convertSpanNodeToTreeViewElement),
  };
}

export default function Home() {
  // log full json no cutoff
  console.log(JSON.stringify([...ingestor.spanMap.values()], null, 2));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        {Array.from(ingestor.spanMap.values()).map((span) => {
          return (
            <div key={span.span.traceId} className="h-[300px] w-[400px]">
              <TraceTree
                key={span.span.spanId}
                toc={[
                  convertSpanNodeToTreeViewElement(
                    ingestor.spanMap.get(span.span.traceId)!
                  ),
                ]}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
