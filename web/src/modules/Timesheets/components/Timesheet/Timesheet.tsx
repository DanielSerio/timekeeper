import { TimesheetBody } from "./TimesheetBody";
import { TimesheetHeader } from "./TimesheetHeader";

export function Timesheet({ isLoading }: { isLoading?: boolean }) {
  return (
    <div className="timesheet-wrapper">
      <div className="timesheet">
        <TimesheetHeader isLoading={isLoading} />
        <TimesheetBody isLoading={isLoading} />
      </div>
    </div>
  );
}
