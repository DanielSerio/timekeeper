import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { Anchor, Flex, Group, Text } from "@mantine/core";
import { useRef } from "react";

export interface TimesheetHeaderProps {
  isLoading?: boolean;
  isEditMode: boolean;
}

export function TimesheetHeader({
  isLoading,
  isEditMode,
}: TimesheetHeaderProps) {
  const nameElementRef = useRef<HTMLDivElement>(null);
  const [state, methods] = useTimesheetContext();

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
        {!!state.name && !isLoading && (
          <Text
            ref={nameElementRef}
            contentEditable={!isLoading && isEditMode}
            dangerouslySetInnerHTML={{ __html: state.name }}
            style={
              isEditMode
                ? {
                    border: "1px dotted grey",
                    padding: "6px 12px",
                  }
                : undefined
            }
            onBlur={() => {
              if (!!methods.changeName && nameElementRef?.current?.innerText) {
                methods.changeName(nameElementRef.current.innerText);
              }
            }}
          />
        )}
      </Group>
    </Flex>
  );
}
