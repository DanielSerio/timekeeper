import type { TimesheetContextState, UpdateLineAction } from "../types";

export function updateLine(state: TimesheetContextState, action: UpdateLineAction) {
  const lines = state.lines;
  const foundLineIndex = lines.findIndex((lne) => !!action.payload.id && lne.id === action.payload.id);

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