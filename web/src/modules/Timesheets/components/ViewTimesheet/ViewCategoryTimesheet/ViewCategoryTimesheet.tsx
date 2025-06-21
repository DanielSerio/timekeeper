import type {
  TimesheetLineRecord,
  TimesheetLineUpdate,
} from "#core/types/models/timesheet-line.model-types";
import { MOCK_CATEGORIES } from "#timesheets/hooks/useTimesheet";
import type { TimesheetContextState } from "#timesheets/providers/timesheet/types";
import { groupTimesheetLines } from "#timesheets/utilities/group-timesheet-lines";
import { Box } from "@mantine/core";
import { CategoryTimesheetLine } from "./CategoryTimesheetLine";
import { CategoryTimesheetLineGroup } from "./CategoryTimesheetLineGroup";
import { Fragment } from "react";
import { getRunningTotal } from "#timesheets/components/Timesheet/TimesheetBody";
import { TimeDisplayCell } from "#timesheets/components/Timesheet/cell/TimeDisplayCell";
import type { CategoryRecord } from "#core/types/models/category.model-types";

export interface ViewCategoryTimesheetProps {
  timesheet: TimesheetContextState;
  categories?: CategoryRecord[];
}

export function ViewCategoryTimesheet({
  timesheet,
  categories,
}: ViewCategoryTimesheetProps) {
  const groupedLines = groupTimesheetLines(timesheet.lines, "By Category");

  return (
    <div className="timesheet-wrapper">
      <div className="view-timesheet category">
        {Object.entries(groupedLines).map(([key, values], idx) => {
          const id = +key;
          const total = getRunningTotal(values);
          const runningTotal = Object.values(groupedLines)
            .slice(0, idx)
            .reduce((newArr, arr) => newArr.concat(arr), [])
            .reduce(
              (sum: number, line: any) => sum + getRunningTotal([line]),
              0
            );

          return (
            <CategoryTimesheetLineGroup
              categoryId={id}
              categories={categories}
              showHeader={idx === 0}
              total={total}
              runningTotalMinutes={runningTotal}
              key={id}
            >
              {(values as (TimesheetLineRecord | TimesheetLineUpdate)[]).map(
                (line, idx2) => {
                  const allSoFar = values.slice(0, idx2 + 1);

                  return (
                    <Fragment key={line.id ?? `idx:${idx2}`}>
                      {!!line.note && (
                        <CategoryTimesheetLine className="note-line">
                          <Box py={2} px="xs">
                            {line.note}
                          </Box>
                        </CategoryTimesheetLine>
                      )}
                      <CategoryTimesheetLine>
                        <Box />
                        <Box>{line.startTime}</Box>
                        <Box>{line.endTime}</Box>
                        <Box>
                          <TimeDisplayCell
                            name="line-time"
                            minutes={getRunningTotal([line])}
                          />
                        </Box>
                        <Box>
                          <TimeDisplayCell
                            name="total-time"
                            minutes={getRunningTotal(allSoFar)}
                          />
                        </Box>
                      </CategoryTimesheetLine>
                    </Fragment>
                  );
                }
              )}
            </CategoryTimesheetLineGroup>
          );
        })}
      </div>
    </div>
  );
}
