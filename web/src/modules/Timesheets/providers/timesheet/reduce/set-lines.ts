import type { SetLinesAction, TimesheetContextState } from "../types";

export function setLines(state: TimesheetContextState, action: SetLinesAction): TimesheetContextState {
  return {
    ...state,
    lines: action.payload.lines.map((line, idx) => ({ ...line, lineNo: idx + 1 }))
  };
}