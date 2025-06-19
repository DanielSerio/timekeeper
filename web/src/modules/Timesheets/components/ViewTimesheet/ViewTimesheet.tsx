import type { useViewTimesheetMode } from "#timesheets/hooks/useViewTimesheetMode";
import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";

export function ViewTimesheet({
  viewTimesheetController: [viewMode],
}: {
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  const [timesheetCtx, timesheetMethods] = useTimesheetContext();

  return <div>{JSON.stringify(timesheetCtx)}</div>;
}
