import { TimesheetsPage } from "#timesheets/pages/TimesheetsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timesheets/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TimesheetsPage />;
}
