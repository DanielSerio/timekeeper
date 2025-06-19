import { Page } from "#core/components/Page";
import { Timesheet } from "#timesheets/components/Timesheet/Timesheet";

export function TimesheetPage({ id }: { id: number }) {
  return (
    <Page>
      <Timesheet id={id} />
    </Page>
  );
}
