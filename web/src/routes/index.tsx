import { BreakdownPage } from "#core/pages/BreakdownPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BreakdownPage />;
}
