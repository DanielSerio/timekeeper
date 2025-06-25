import { createFileRoute, redirect } from "@tanstack/react-router";
import { TimesheetPage } from "#timesheets/pages/TimesheetPage";
import { lazy } from "react";

export const Route = createFileRoute("/timesheets/$id")({
  component: RouteComponent,
  loader(ctx) {
    const { params } = ctx;
    const id = +params.id;

    if (isNaN(id) || id % 1 !== 0 || id <= 0) {
      throw redirect({
        to: "/timesheets",
      });
    }
  },
});

const TimesheetStyles = lazy(
  () => import("#core/components/Lazy/LazyTimesheetStyles")
);

function RouteComponent() {
  const { id: idStr } = Route.useParams();
  // Will always be a number due to the redirect in the route loader
  const id = +idStr;

  return (
    <TimesheetStyles>
      <TimesheetPage id={id} />
    </TimesheetStyles>
  );
}
