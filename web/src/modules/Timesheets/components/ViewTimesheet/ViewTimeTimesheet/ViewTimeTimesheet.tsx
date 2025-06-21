import type { TimesheetContextState } from "#timesheets/providers/timesheet/types";
import {
  groupTimesheetLines,
  type TimeGroupedTimesheet,
} from "#timesheets/utilities/group-timesheet-lines";
import { Badge, Box, Text } from "@mantine/core";
import { TimeTimesheetLine } from "./TimeTimesheetLine";
import { Fragment } from "react/jsx-runtime";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { TimeDisplayCell } from "#timesheets/components/Timesheet/cell/TimeDisplayCell";
import { getRunningTotal } from "#timesheets/components/Timesheet/TimesheetBody";
import { SkeletonTimesheetRows } from "#timesheets/components/Timesheet/SkeletonTimesheetRows";

export interface ViewTimeTimesheetProps {
  timesheet: TimesheetContextState;
  categories?: CategoryRecord[];
  isLoading?: boolean;
}

export function ViewTimeTimesheet({
  timesheet,
  categories,
  isLoading,
}: ViewTimeTimesheetProps) {
  const groupedLines = groupTimesheetLines(
    timesheet.lines,
    "By Time"
  ) as TimeGroupedTimesheet;
  const lines = groupedLines.time;

  return (
    <div className="timesheet-wrapper">
      <div className="view-timesheet time">
        {isLoading && <SkeletonTimesheetRows count={10} />}
        {!isLoading &&
          lines.map((line, idx) => {
            const category = (categories ?? []).find(
              (cat) => cat.id === line.categoryId
            );
            const runningTotalMinutes = getRunningTotal(lines.slice(0, idx));
            const total = getRunningTotal([line]);

            return (
              <Fragment key={line.id ? `id:${line.id}` : `idx:${idx}`}>
                {idx === 0 && (
                  <TimeTimesheetLine>
                    <Box>Category</Box>
                    <Box>Start Time</Box>
                    <Box>End Time</Box>
                    <Box>Line Time</Box>
                    <Box>Total Time</Box>
                  </TimeTimesheetLine>
                )}
                {!!line.note && (
                  <TimeTimesheetLine className="note-line">
                    <Box py={2} px="xs">
                      {line.note}
                    </Box>
                  </TimeTimesheetLine>
                )}
                <TimeTimesheetLine>
                  <Badge variant="light" color="gray" radius={0} h={"100%"}>
                    {category?.name}
                  </Badge>
                  <Box>{line.startTime}</Box>
                  <Box>{line.endTime}</Box>
                  <Box>
                    <TimeDisplayCell name="line-time" minutes={total} />
                  </Box>
                  <Box>
                    <TimeDisplayCell
                      c={idx === lines.length - 1 ? "yellow" : undefined}
                      name="total-time"
                      minutes={runningTotalMinutes + total}
                    />
                  </Box>
                </TimeTimesheetLine>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}
