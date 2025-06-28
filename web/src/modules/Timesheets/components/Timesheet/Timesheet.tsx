import type { useTimesheetEditMode } from "#timesheets/hooks/useTimesheetEditMode";
import { TimesheetBody } from "./TimesheetBody";
import { TimesheetHeader } from "./TimesheetHeader";

export interface TimesheetProps {
  isLoading?: boolean;
  editModeController: ReturnType<typeof useTimesheetEditMode>;
}
//TODO: Timesheet save
//TODO: Timesheet cancel
export function Timesheet({
  isLoading,
  editModeController: [isEditMode],
}: TimesheetProps) {
  return (
    <div className="timesheet-wrapper">
      <div className="timesheet">
        <TimesheetHeader isLoading={isLoading} isEditMode={isEditMode} />
        <TimesheetBody isLoading={isLoading} />
      </div>
    </div>
  );
}
