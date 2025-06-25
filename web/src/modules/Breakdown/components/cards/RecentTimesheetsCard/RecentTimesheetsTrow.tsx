import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import { Anchor, Table } from "@mantine/core";

export interface RecentTimesheetsTrowProps {
  timesheet: TimesheetRecord;
}

export function RecentTimesheetsTrow({ timesheet }: RecentTimesheetsTrowProps) {
  const url = `/timesheets/${timesheet.id}`;

  return (
    <Table.Tr className="recent-timesheets">
      <Table.Td>
        <Anchor href={url} lineClamp={1} maw="15ch" title={timesheet.name}>
          {timesheet.name}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor href={url}>{timesheet.date.toLocaleDateString()}</Anchor>
      </Table.Td>
    </Table.Tr>
  );
}
