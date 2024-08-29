export type AttributeValue = {
  stringValue?: string;
};

export type Attribute = {
  key: string;
  value: AttributeValue;
};

export type Span = {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  kind: number;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes: Attribute[];
  droppedAttributesCount: number;
  events: any[];
  droppedEventsCount: number;
  status: {
    code: number;
  };
  links: any[];
  droppedLinksCount: number;
};

export type ScopeSpan = {
  scope: {
    name: string;
    version: string;
  };
  spans: Span[];
};

export type ResourceSpan = {
  resource: {
    attributes: Attribute[];
    droppedAttributesCount: number;
  };
  scopeSpans: ScopeSpan[];
};

export type OTELData = {
  resourceSpans: ResourceSpan[];
};

export type SpanNode = {
  span: Span;
  children: SpanNode[];
};

export class OTELIngestor {
  public spanMap: Map<string, SpanNode>;
  private static instance: OTELIngestor;

  constructor() {
    this.spanMap = new Map<string, SpanNode>();
  }

  ingest(data: OTELData) {
    data.resourceSpans.forEach((resourceSpan) => {
      resourceSpan.scopeSpans.forEach((scopeSpan) => {
        scopeSpan.spans.forEach((span) => {
          const spanNode: SpanNode = { span, children: [] };

          if (span.parentSpanId) {
            const parentSpanNode = this.findParentSpanNode(
              span.traceId,
              span.parentSpanId
            );

            if (parentSpanNode) {
              parentSpanNode.children.push(spanNode);
            } else {
              this.spanMap.set(span.traceId, spanNode);
            }
          } else {
            // No parentSpanId means it's a root span
            this.spanMap.set(span.traceId, spanNode);
          }
        });
      });
    });
  }

  private findParentSpanNode(
    traceId: string,
    parentSpanId: string
  ): SpanNode | undefined {
    const rootSpanNode = this.spanMap.get(traceId);
    if (!rootSpanNode) return undefined;

    return this.findSpanNodeRecursive(rootSpanNode, parentSpanId);
  }

  private findSpanNodeRecursive(
    spanNode: SpanNode,
    spanId: string
  ): SpanNode | undefined {
    if (spanNode.span.spanId === spanId) {
      return spanNode;
    }

    for (const childNode of spanNode.children) {
      const result = this.findSpanNodeRecursive(childNode, spanId);
      if (result) return result;
    }

    return undefined;
  }

  getSpanTree(traceId: string): SpanNode | undefined {
    return this.spanMap.get(traceId);
  }
  public static getInstance(): OTELIngestor {
    if (!OTELIngestor.instance) {
      OTELIngestor.instance = new OTELIngestor();
    }
    return OTELIngestor.instance;
  }
}

export const ingestor = OTELIngestor.getInstance();
