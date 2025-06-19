import type { AddLinesAction, TimesheetContextState } from "../types";

export function addLines(state: TimesheetContextState, action: AddLinesAction): TimesheetContextState {
  const currentLines = state.lines;
  const newLines = action.payload.lines;

  const nextLines = [...currentLines, ...newLines].map((line, idx) => ({ ...line, lineNo: idx + 1 }));

  return {
    ...state,
    lines: nextLines
  };
}