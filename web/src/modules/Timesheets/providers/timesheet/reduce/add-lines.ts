import type { AddLinesAction, TimesheetContextState } from "../types";

export function addLines(state: TimesheetContextState, action: AddLinesAction): TimesheetContextState {
  const currentLines = state.lines;
  const newLines = action.payload.lines;

  const nextLines = [...currentLines, ...newLines];

  return {
    ...state,
    lines: nextLines
  };
}