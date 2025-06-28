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
          isLoading={timesheetQuery.isLoading}
          editModeController={editModeController}
          viewTimesheetController={viewTimesheetController}
        />
        {isEditMode ? (
          <Timesheet
            isLoading={timesheetQuery.isLoading}
            editModeController={editModeController}
          />
        ) : (
          <ViewTimesheet
            isLoading={timesheetQuery.isLoading}
            viewTimesheetController={viewTimesheetController}
          />
        )}
      </Page>
    </TimesheetProvider>
  );
}
