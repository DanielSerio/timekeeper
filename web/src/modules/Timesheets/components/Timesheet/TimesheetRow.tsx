import { Box, type ComboboxItem } from "@mantine/core";
import { TimesheetCategoryCell } from "./cell/TimesheetCategoryCell";
import { TimesheetStartTimeCell } from "./cell/TimesheetStartTimeCell";
import { TimesheetEndTimeCell } from "./cell/TimesheetEndTimeCell";
import { TimeDisplayCell } from "./cell/TimeDisplayCell";
import { TimesheetCell } from "./cell/TimesheetCell";
import { forwardRef, type ForwardedRef, type PropsWithChildren } from "react";
import type {
  EmptyTimesheetLine,
  TimesheetLineCreate,
  TimesheetLineRecord,
  TimesheetLineUpdate,
} from "#core/types/models/timesheet-line.model-types";
import { TimesheetNoteCell } from "./cell/TimesheetNoteCell";

function TimesheetRowComponent(
  {
    children,
    line,
    onChange,
  }: PropsWithChildren<{
    line:
      | TimesheetLineCreate
      | TimesheetLineUpdate
      | TimesheetLineRecord
      | EmptyTimesheetLine;
    onChange: {
      readonly categoryId: (value: string | null, option: ComboboxItem) => void;
      readonly startTime: (ev: React.ChangeEvent<HTMLInputElement>) => void;
      readonly endTime: (ev: React.ChangeEvent<HTMLInputElement>) => void;
      readonly note: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    };
  }>,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const startDate = `${line.startTime}:00.000`;
  const endDate = `${line.endTime}:00.000`;

  return (
    <Box className="row" ref={ref}>
      <TimesheetCategoryCell
        categoryId={line.categoryId!}
        onChange={onChange.categoryId}
      />
      <TimesheetStartTimeCell
        startTime={startDate}
        onChange={onChange.startTime}
      />
      <TimesheetEndTimeCell endTime={endDate} onChange={onChange.endTime} />
      <TimeDisplayCell name="line-time" minutes={0} />
      <TimeDisplayCell name="total-time" minutes={0} />
      <TimesheetNoteCell note={line.note ?? null} onChange={onChange.note} />
      {!!children && <TimesheetCell name="actions">{children}</TimesheetCell>}
    </Box>
  );
}

export const TimesheetRow = forwardRef(TimesheetRowComponent);
