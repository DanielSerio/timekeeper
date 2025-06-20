import type { TimesheetContextState } from "#timesheets/providers/timesheet/types";

export interface ViewCategoryTimesheetProps {
  timesheet: TimesheetContextState;
}

export function ViewCategoryTimesheet({}: ViewCategoryTimesheetProps) {
  return <div>ViewCategoryTimesheet</div>;
}
