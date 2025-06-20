import type { TimesheetContextState } from "#timesheets/providers/timesheet/types";
import { groupTimesheetLines } from "#timesheets/utilities/group-timesheet-lines";

export interface ViewTimeTimesheetProps {
  timesheet: TimesheetContextState;
}

export function ViewTimeTimesheet({ timesheet }: ViewTimeTimesheetProps) {
  const groupedLines = groupTimesheetLines(timesheet.lines, "By Time");
  return <div>{JSON.stringify(groupedLines)}</div>;
}
