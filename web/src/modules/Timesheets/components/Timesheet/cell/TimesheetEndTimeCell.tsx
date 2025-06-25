import { TextInput } from "@mantine/core";
import { TimesheetCell } from "./TimesheetCell";
import type { ChangeEvent } from "react";

export function TimesheetEndTimeCell({
  endTime,
  onChange,
}: {
  endTime: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TimesheetCell name="End">
      <TextInput
        size="xs"
        type="time"
        defaultValue={endTime}
        onBlurCapture={onChange}
      />
    </TimesheetCell>
  );
}
