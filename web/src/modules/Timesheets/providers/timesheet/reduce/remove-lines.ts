import type { TimesheetLineCreate, TimesheetLineRecord, TimesheetLineUpdate } from "#core/types/models/timesheet-line.model-types";
import type { RemoveLinesAction, TimesheetContextState } from "../types";

export function removeLines(state: TimesheetContextState, action: RemoveLinesAction) {
  const deleteLines = Array.from(new Set([...state.deleteLines, ...action.payload.ids]));

  const lineNotInDeleteArray = (line: TimesheetLineCreate | TimesheetLineUpdate | TimesheetLineRecord) => {
    if (!(line as TimesheetLineUpdate).id) return true;

    return !deleteLines.includes((line as TimesheetLineUpdate).id!);
  };

  return {
    ...state,
    deleteLines,
    lines: state.lines.filter(lineNotInDeleteArray).map((line, idx) => ({ ...line, lineNo: idx + 1 })),
  };
}