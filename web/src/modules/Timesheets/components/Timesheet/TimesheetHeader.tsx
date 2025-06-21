import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";

export function TimesheetHeader({}: { isLoading?: boolean }) {
  const [timesheetCtx] = useTimesheetContext();

  return <div>TimesheetHeader {timesheetCtx.timesheetId}</div>;
}
