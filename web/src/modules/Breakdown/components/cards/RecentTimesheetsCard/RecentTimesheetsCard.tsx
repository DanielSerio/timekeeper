import { BreakdownCard } from "#breakdown/components/BreakdownCard";
import { Anchor, Table } from "@mantine/core";
import { RecentTimesheetsThead } from "./RecentTimesheetsThead";
import { RecentTimesheetsTrow } from "./RecentTimesheetsTrow";

export function RecentTimesheetsCard() {
  return (
    <BreakdownCard title="Recent Timesheets">
      <Table>
        <RecentTimesheetsThead />
        <Table.Tbody>
          {[...new Array(5)].map((_, i) => {
            const id = i + 1;
            const date = `2025-6-${30 - id}`;

            const timesheet = {
              id,
              date: new Date(date),
              name: `Timesheet #${id} - ${date}`,
              lastUpdatedAt: null,
            };

            return <RecentTimesheetsTrow key={id} timesheet={timesheet} />;
          })}
          <Table.Tr>
            <Table.Td colSpan={2}>
              <Anchor href="/timesheets">...more</Anchor>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </BreakdownCard>
  );
}
