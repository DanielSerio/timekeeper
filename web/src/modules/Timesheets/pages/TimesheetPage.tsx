import { Page } from "#core/components/Page";
import { Timesheet } from "#timesheets/components/Timesheet/Timesheet";
import { TimesheetToolbar } from "#timesheets/components/TimesheetToolbar/TimesheetToolbar";
import { ViewTimesheet } from "#timesheets/components/ViewTimesheet/ViewTimesheet";
import { useTimesheet } from "#timesheets/hooks/useTimesheet";
import { useTimesheetEditMode } from "#timesheets/hooks/useTimesheetEditMode";
import { useViewTimesheetMode } from "#timesheets/hooks/useViewTimesheetMode";
import { TimesheetProvider } from "#timesheets/providers/timesheet/timesheet.provider";

export function TimesheetPage({ id }: { id: number }) {
  const timesheetQuery = useTimesheet(id);
  const editModeController = useTimesheetEditMode();
  const viewTimesheetController = useViewTimesheetMode();

  const [isEditMode] = editModeController;

  return (
    <TimesheetProvider timesheet={timesheetQuery.data}>
      <Page>
        <TimesheetToolbar
          editModeController={editModeController}
          viewTimesheetController={viewTimesheetController}
        />
        {isEditMode ? (
          <Timesheet />
        ) : (
          <ViewTimesheet viewTimesheetController={viewTimesheetController} />
        )}
      </Page>
    </TimesheetProvider>
  );
}
