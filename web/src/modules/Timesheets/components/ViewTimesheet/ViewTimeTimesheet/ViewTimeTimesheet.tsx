import type { TimesheetContextState } from "#timesheets/providers/timesheet/types";

export interface ViewTimeTimesheetProps {
  timesheet: TimesheetContextState;
}

export function ViewTimeTimesheet({}: ViewTimeTimesheetProps) {
  return <div>ViewTimeTimesheet</div>;
}
