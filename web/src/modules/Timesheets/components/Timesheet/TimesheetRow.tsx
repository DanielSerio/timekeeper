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
import { differenceInMinutes } from "date-fns";

function TimesheetRowComponent(
  {
    children,
    line,
    runningTotalMinutes,
    onChange,
  }: PropsWithChildren<{
    runningTotalMinutes: number;
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
  const testDate = `2024-12-12`;
  const startTime = `${line.startTime}:00.000`;
  const endTime = `${line.endTime}:00.000`;

  const minutes = Math.abs(
    differenceInMinutes(
      new Date(`${testDate} ${startTime}`),
      new Date(`${testDate} ${endTime}`)
    )
  );

  return (
    <Box className="row" ref={ref}>
      <TimesheetCategoryCell
        categoryId={line.categoryId!}
        onChange={onChange.categoryId}
      />
      <TimesheetStartTimeCell
        startTime={startTime}
        onChange={onChange.startTime}
      />
      <TimesheetEndTimeCell endTime={endTime} onChange={onChange.endTime} />
      <TimeDisplayCell name="line-time" minutes={minutes} />
      <TimeDisplayCell
        name="total-time"
        minutes={runningTotalMinutes + minutes}
      />
      {!!children && <TimesheetCell name="actions">{children}</TimesheetCell>}
      <TimesheetNoteCell note={line.note ?? null} onChange={onChange.note} />
    </Box>
  );
}

export const TimesheetRow = forwardRef(TimesheetRowComponent);
