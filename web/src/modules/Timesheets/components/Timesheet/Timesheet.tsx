import { useTimesheet } from "#timesheets/hooks/useTimesheet";
import { TimesheetProvider } from "#timesheets/providers/timesheet/timesheet.provider";
import { TimesheetBody } from "./TimesheetBody";
import { TimesheetHeader } from "./TimesheetHeader";

export function Timesheet({ id }: { id: number }) {
  const timesheetQuery = useTimesheet(id);

  return (
    <TimesheetProvider timesheet={timesheetQuery.data}>
      <TimesheetHeader />
      <TimesheetBody />
    </TimesheetProvider>
  );
}
