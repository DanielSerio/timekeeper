import type { TimesheetLineCreate, TimesheetLineRecord } from "#core/types/models/timesheet-line.model-types";
import { areIntervalsOverlapping, type Interval } from 'date-fns';

/**
 * Checks if a line can be inserted (has no time interval overlap)
 */
export function canAddLine(newLine: TimesheetLineCreate, lines: (TimesheetLineCreate | TimesheetLineRecord)[]) {
  const baseDate = `2024-12-12`;
  const newLineInterval: Interval = {
    start: `${baseDate} ${newLine.startTime}`,
    end: `${baseDate} ${newLine.endTime}`,
  };

  let index = 0;

  for (const line of lines) {
    const lineInterval: Interval = {
      start: `${baseDate} ${line.startTime}`,
      end: `${baseDate} ${line.endTime}`,
    };

    if (areIntervalsOverlapping(newLineInterval, lineInterval)) {
      return {
        canAdd: false,
        overlap: {
          index,
          line
        }
      };
    }

    index += 1;
  }

  return {
    canAdd: true,
    overlap: null
  };
}