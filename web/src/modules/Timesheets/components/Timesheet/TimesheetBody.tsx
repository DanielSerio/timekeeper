import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";

export function TimesheetBody() {
  const [timesheetCtx] = useTimesheetContext();
  return <div>{JSON.stringify(timesheetCtx.lines)}</div>;
}
