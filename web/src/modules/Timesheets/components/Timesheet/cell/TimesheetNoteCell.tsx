import type { ChangeEvent } from "react";
import { TimesheetCell } from "./TimesheetCell";
import { Textarea } from "@mantine/core";

export function TimesheetNoteCell({
  note,
  onChange,
}: {
  note: string | null;
  onChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <TimesheetCell name="note">
      <Textarea autosize size="xs" value={note ?? ""} onChange={onChange} />
    </TimesheetCell>
  );
}
