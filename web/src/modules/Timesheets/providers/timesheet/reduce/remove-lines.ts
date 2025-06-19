import type { TimesheetLineCreate, TimesheetLineRecord, TimesheetLineUpdate } from "#core/types/models/timesheet-line.model-types";
import type { RemoveLinesAction, TimesheetContextState } from "../types";

export function removeLines(state: TimesheetContextState, action: RemoveLinesAction) {
  const lineNotInDeleteArray = (line: TimesheetLineCreate | TimesheetLineUpdate | TimesheetLineRecord) => {
    return line.id && !action.payload.lineIds.includes(line.id);
  };

  return {
    ...state,
    lines: state.lines.filter(lineNotInDeleteArray),
    deleteLines: Array.from(new Set([...state.deleteLines, ...action.payload.lineIds]))
  };
}