import { TimesheetPage } from "#timesheets/pages/TimesheetPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timesheets/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TimesheetPage />;
}
