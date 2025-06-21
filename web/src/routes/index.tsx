import { BreakdownPage } from "#breakdown/pages/BreakdownPage";
import { createFileRoute } from "@tanstack/react-router";
import "#styles/output/breakdown.scss";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BreakdownPage />;
}
