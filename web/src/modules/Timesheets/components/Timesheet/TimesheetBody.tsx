import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { ActionIcon, Box, Button } from "@mantine/core";
import { forwardRef, useRef, type ForwardedRef } from "react";
import { TimesheetRow } from "./TimesheetRow";
import { useTimesheetNewLine } from "#timesheets/hooks/useTimesheetNewLine";
import { getEditLineHandlers } from "#timesheets/utilities/get-edit-line-handlers";
import type {
  TimesheetLineCreate,
  TimesheetLineRecord,
  TimesheetLineUpdate,
} from "#core/types/models/timesheet-line.model-types";
import { TbPlus, TbTrash } from "react-icons/tb";
import { resetFields } from "#timesheets/utilities/reset-fields";
import { classNames } from "#core/utilities/attribute";
import { constructMessageList } from "#core/utilities/error/construct-message-list";
import { differenceInMinutes } from "date-fns";

export interface TimesheetBodyComponentProps {
  className?: string | string[];
}

export function getRunningTotal(
  lines: (TimesheetLineCreate | TimesheetLineRecord | TimesheetLineUpdate)[]
) {
  return lines.reduce((sum, line) => {
    return (
      sum +
      Math.abs(
        differenceInMinutes(
          new Date(`2024-12-12 ${line.startTime}:00.000`),
          new Date(`2024-12-12 ${line.endTime}:00.000`)
        )
      )
    );
  }, 0);
}

function TimesheetBodyComponent(
  { className, ...props }: TimesheetBodyComponentProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const [timesheetCtx, timesheetMethods] = useTimesheetContext();
  const [{ line: newLine, validLine }, { onChange: onNewLineChange, onAdd }] =
    useTimesheetNewLine({
      timesheetContext: timesheetCtx,
      timesheetMethods,
    });

  const rowRef = useRef<HTMLDivElement>(null);

  const onAddLine = () => {
    onAdd();
    resetFields(rowRef);
  };

  const classes = classNames("timesheet-body", className);
  const totalMinutes = getRunningTotal(timesheetCtx.lines);

  return (
    <Box ref={ref} className={classes} {...props}>
      {timesheetCtx.lines.length > 0 &&
        timesheetCtx.lines.map((line, idx) => {
          const ctxLine = line as TimesheetLineCreate | TimesheetLineRecord;
          const onChange = getEditLineHandlers(timesheetMethods, {
            line: ctxLine,
            idx: idx + 1,
          });
          const runningTotalMinutes = getRunningTotal(
            timesheetCtx.lines.slice(0, idx)
          );

          return (
            <TimesheetRow
              key={line.id ? `id:${line.id}` : `idx:${idx}`}
              runningTotalMinutes={runningTotalMinutes}
              line={line}
              onChange={onChange}
            >
              <ActionIcon color="red" variant="subtle" size="sm">
                <TbTrash />
              </ActionIcon>
            </TimesheetRow>
          );
        })}
      <TimesheetRow
        line={newLine}
        onChange={onNewLineChange}
        ref={rowRef}
        runningTotalMinutes={totalMinutes}
      >
        <ActionIcon
          variant="light"
          color="blue"
          size="sm"
          onClick={onAddLine}
          disabled={!validLine.record}
          title={
            !!validLine.error
              ? constructMessageList(validLine.error)
              : undefined
          }
        >
          <TbPlus />
        </ActionIcon>
      </TimesheetRow>
    </Box>
  );
}

export const TimesheetBody = forwardRef(TimesheetBodyComponent);
