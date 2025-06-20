import type { TimesheetContextState } from "#timesheets/providers/timesheet/types";
import { groupTimesheetLines } from "#timesheets/utilities/group-timesheet-lines";

export interface ViewCategoryTimesheetProps {
  timesheet: TimesheetContextState;
}

export function ViewCategoryTimesheet({
  timesheet,
}: ViewCategoryTimesheetProps) {
  const groupedLines = groupTimesheetLines(timesheet.lines, "By Category");

  return <div>{JSON.stringify(groupedLines)}</div>;
}
