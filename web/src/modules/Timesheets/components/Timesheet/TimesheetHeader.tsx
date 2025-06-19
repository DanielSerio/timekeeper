import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { useEffect } from "react";

export function TimesheetHeader() {
  const [timesheetCtx, timesheetMethods] = useTimesheetContext();

  useEffect(() => {
    if (timesheetCtx && timesheetCtx.lines.length === 0) {
      timesheetMethods.addLines({
        categoryId: 1,
        startTime: "08:45",
        endTime: "09:00",
        note: null,
      });
    }
  }, [timesheetCtx]);

  return <div>TimesheetHeader {timesheetCtx.timesheetId}</div>;
}
