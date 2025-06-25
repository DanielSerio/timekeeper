import { Anchor, Flex } from "@mantine/core";

export function TimesheetHeader({}: { isLoading?: boolean }) {
  return (
    <Flex className="timesheet-header" align="center" px="sm" h={48}>
      <Anchor href="/timesheets">
        <span>&lt;&nbsp;Back To Timesheets</span>
      </Anchor>
    </Flex>
  );
}
