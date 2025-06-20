import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";

export function TimesheetHeader() {
  const [timesheetCtx] = useTimesheetContext();

  return <div>TimesheetHeader {timesheetCtx.timesheetId}</div>;
}
