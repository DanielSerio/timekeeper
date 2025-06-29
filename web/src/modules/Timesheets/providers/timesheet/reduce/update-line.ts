import type { TimesheetLineUpdate } from "#core/types/models/timesheet-line.model-types";
import { findIndex } from "#core/utilities/iterator";
import type { TimesheetContextState, UpdateLineAction } from "../types";

export function updateLine(state: TimesheetContextState, action: UpdateLineAction) {
  const lines = state.lines;
  const foundLineIndex = findIndex(lines, (lne) => !!action.payload.lineNo && (lne as TimesheetLineUpdate).lineNo === action.payload.lineNo);

  if (foundLineIndex === -1) {
    return state;
  }

  const foundLine = lines[foundLineIndex];

  Object.assign(foundLine, action.payload);

  lines.splice(foundLineIndex, 1, foundLine);

  return {
    ...state,
    lines
  };
}