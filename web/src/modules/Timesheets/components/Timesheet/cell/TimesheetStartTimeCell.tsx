import { TextInput } from "@mantine/core";
import { TimesheetCell } from "./TimesheetCell";
import type { ChangeEvent } from "react";

export function TimesheetStartTimeCell({
  startTime,
  onChange,
}: {
  startTime: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TimesheetCell name="Start">
      <TextInput
        size="xs"
        type="time"
        defaultValue={startTime}
        onBlur={onChange}
      />
    </TimesheetCell>
  );
}
