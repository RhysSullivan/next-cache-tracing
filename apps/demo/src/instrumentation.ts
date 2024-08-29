import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "next-cache-tracing",
    spanProcessors: [
      new SimpleSpanProcessor(
        new OTLPTraceExporter({
          url: "http://localhost:3000/api/traces",
        })
      ),
      new SimpleSpanProcessor(
        new OTLPTraceExporter({
          url: "https://webhook.site/4666f6f0-6b6b-4aaf-8d47-0aaf5561b63e",
        })
      ),
      new SimpleSpanProcessor(
        new OTLPTraceExporter({
          url: "http://localhost:4318/v1/traces",
        })
      ),
    ],
  });
}
