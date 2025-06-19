import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { ActionIcon, Box, Button } from "@mantine/core";
import { forwardRef, useRef, type ForwardedRef } from "react";
import { TimesheetRow } from "./TimesheetRow";
import { useTimesheetNewLine } from "#timesheets/hooks/useTimesheetNewLine";
import { getEditLineHandlers } from "#timesheets/utilities/get-edit-line-handlers";
import type {
  TimesheetLineCreate,
  TimesheetLineRecord,
} from "#core/types/models/timesheet-line.model-types";
import { TbPlus, TbTrash } from "react-icons/tb";
import { resetFields } from "#timesheets/utilities/reset-fields";
import { classNames } from "#core/utilities/attribute";

export interface TimesheetBodyComponentProps {
  className?: string | string[];
}

function TimesheetBodyComponent(
  { className, ...props }: TimesheetBodyComponentProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const [timesheetCtx, timesheetMethods] = useTimesheetContext();
  const [newLine, { onChange: onNewLineChange, onAdd }] =
    useTimesheetNewLine(timesheetMethods);

  const rowRef = useRef<HTMLDivElement>(null);

  const onAddLine = () => {
    onAdd();
    resetFields(rowRef);
  };

  const classes = classNames("timesheet-body", className);

  return (
    <Box ref={ref} className={classes} {...props}>
      {timesheetCtx.lines.length > 0 &&
        timesheetCtx.lines.map((line, idx) => {
          const ctxLine = line as TimesheetLineCreate | TimesheetLineRecord;
          const onChange = getEditLineHandlers(timesheetMethods, {
            line: ctxLine,
            idx: idx + 1,
          });
          return (
            <TimesheetRow
              key={line.id ? `id:${line.id}` : `idx:${idx}`}
              line={line}
              onChange={onChange}
            >
              <ActionIcon color="red" variant="subtle" size="sm">
                <TbTrash />
              </ActionIcon>
            </TimesheetRow>
          );
        })}
      <TimesheetRow line={newLine} onChange={onNewLineChange} ref={rowRef}>
        <ActionIcon variant="light" color="blue" size="sm" onClick={onAddLine}>
          <TbPlus />
        </ActionIcon>
      </TimesheetRow>
    </Box>
  );
}

export const TimesheetBody = forwardRef(TimesheetBodyComponent);
