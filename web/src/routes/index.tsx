import { BreakdownPage } from "#breakdown/pages/BreakdownPage";
import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const BreakdownStyles = lazy(
  () => import("#core/components/Lazy/LazyBreakdownStyles")
);

function RouteComponent() {
  return (
    <BreakdownStyles>
      <BreakdownPage />
    </BreakdownStyles>
  );
}
