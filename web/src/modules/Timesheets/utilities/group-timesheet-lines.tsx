import type {
  TimesheetLineCreate,
  TimesheetLineRecord,
  TimesheetLineUpdate,
} from "#core/types/models/timesheet-line.model-types";
import type { ViewTimesheetMode } from "#timesheets/hooks/useViewTimesheetMode";

type TimesheetLines = (
  | TimesheetLineRecord
  | TimesheetLineCreate
  | TimesheetLineUpdate
)[];

export interface TimeGroupedTimesheet {
  [k: string]: TimesheetLines;
  time: TimesheetLines;
}

export interface CategoryGroupedTimesheet {
  [k: number]: TimesheetLines;
}

type GroupedTimesheet = TimeGroupedTimesheet | CategoryGroupedTimesheet;

/**
 * Groups timesheet lines by "time" or by "category"
 */
export function groupTimesheetLines(
  lines: TimesheetLines,
  groupBy: ViewTimesheetMode
): GroupedTimesheet {
  if (groupBy === "By Time") {
    return {
      time: lines,
    } as TimeGroupedTimesheet;
  }

  const grouped: CategoryGroupedTimesheet = {};

  for (const line of lines) {
    if (line.categoryId) {
      if (!grouped[line.categoryId]) {
        grouped[line.categoryId] = [];
      }

      grouped[line.categoryId].push(line);
    }
  }

  return grouped;
}
