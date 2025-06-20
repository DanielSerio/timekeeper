import type { useViewTimesheetMode } from "#timesheets/hooks/useViewTimesheetMode";
import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { ViewCategoryTimesheet } from "./ViewCategoryTimesheet/ViewCategoryTimesheet";
import { ViewTimeTimesheet } from "./ViewTimeTimesheet/ViewTimeTimesheet";

export function ViewTimesheet({
  viewTimesheetController: [viewMode],
}: {
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  const [timesheetCtx] = useTimesheetContext();

  if (viewMode === "By Category") {
    return <ViewCategoryTimesheet timesheet={timesheetCtx} />;
  }

  return <ViewTimeTimesheet timesheet={timesheetCtx} />;
}
