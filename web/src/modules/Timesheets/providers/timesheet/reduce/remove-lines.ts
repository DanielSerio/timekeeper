import type { TimesheetLineCreate, TimesheetLineRecord, TimesheetLineUpdate } from "#core/types/models/timesheet-line.model-types";
import type { RemoveLinesAction, TimesheetContextState } from "../types";

export function removeLines(state: TimesheetContextState, action: RemoveLinesAction) {
  const lineNotInDeleteArray = (line: TimesheetLineCreate | TimesheetLineUpdate | TimesheetLineRecord) => {
    if (!(line as TimesheetLineUpdate).lineNo) return false;

    return !action.payload.lineNos.includes((line as TimesheetLineUpdate).lineNo!);
  };

  return {
    ...state,
    lines: state.lines.filter(lineNotInDeleteArray).map((line, idx) => ({ ...line, lineNo: idx + 1 })),
    deleteLines: Array.from(new Set([...state.deleteLines, ...action.payload.lineNos]))
  };
}