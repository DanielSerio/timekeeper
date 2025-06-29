import { CategoriesPage } from "#categories/pages/CategoriesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoriesPage />;
}
