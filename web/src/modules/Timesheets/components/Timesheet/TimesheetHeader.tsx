import { Anchor, Button, Flex, Group, Text } from "@mantine/core";
import { TbDeviceFloppy } from "react-icons/tb";

export function TimesheetHeader({}: { isLoading?: boolean }) {
  return (
    <Flex
      className="timesheet-header"
      align="center"
      justify="space-between"
      px="sm"
      h={48}
    >
      <Anchor href="/timesheets">
        <span>&lt;&nbsp;Back To Timesheets</span>
      </Anchor>
      <Group>
        <Text
          contentEditable
          dangerouslySetInnerHTML={{ __html: "Timesheet 2025/06/28" }}
        />
        <Button size="xs" rightSection={<TbDeviceFloppy />}>
          <Text>Save</Text>
        </Button>
      </Group>
    </Flex>
  );
}
