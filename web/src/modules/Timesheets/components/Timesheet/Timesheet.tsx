import { TimesheetBody } from "./TimesheetBody";
import { TimesheetHeader } from "./TimesheetHeader";

export function Timesheet() {
  return (
    <div className="timesheet-wrapper">
      <div className="timesheet">
        <TimesheetHeader />
        <TimesheetBody />
      </div>
    </div>
  );
}
