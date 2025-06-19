import type {
  TimesheetLineCreate,
  TimesheetLineRecord,
  TimesheetLineUpdate,
} from "#core/types/models/timesheet-line.model-types";
import type { ExtendedTimesheetRecord } from "#core/types/models/timesheet.model-types";
import type { PropsWithChildren } from "react";

export interface TimesheetContextState {
  timesheetId: number;
  date: Date;
  name: string;
  lines: (TimesheetLineCreate | TimesheetLineUpdate | TimesheetLineRecord)[];
  deleteLines: number[];
}
export interface TimesheetContextMethods {
  reset(): void;
  setState(state: TimesheetContextState): void;
  changeName(name: string): void;
  updateLine(update: TimesheetLineUpdate | TimesheetLineRecord): void;
  setLines(lines: (TimesheetLineCreate | TimesheetLineUpdate | TimesheetLineRecord)[]): void;
  addLines(...lines: (TimesheetLineCreate | TimesheetLineUpdate | TimesheetLineRecord)[]): void;
  removeLines(...lineIds: number[]): void;
}

export type TimesheetProviderContext = [
  TimesheetContextState,
  TimesheetContextMethods,
];

export interface TimesheetProviderProps extends PropsWithChildren {
  timesheet?: ExtendedTimesheetRecord;
}

export interface TimesheetLinesPayload {
  lines: (TimesheetLineCreate | TimesheetLineUpdate)[];
}

type TimesheetUpdatePayload = TimesheetLineUpdate | TimesheetLineRecord;

interface TimesheetDeletePayload {
  lineNos: number[];
}

export type TimesheetActionName = 'reset' | 'set-state' | 'change-name' | 'update-line' | 'set-lines' | 'add-lines' | 'remove-lines';
type TimesheetActionBasePayload = null | string | TimesheetContextState | TimesheetUpdatePayload | TimesheetLinesPayload | TimesheetDeletePayload;

interface TimesheetActionBase {
  name: TimesheetActionName;
  payload: TimesheetActionBasePayload;
}

interface ResetAction extends TimesheetActionBase {
  name: 'reset';
  payload: null;
}
interface SetStateAction extends TimesheetActionBase {
  name: 'set-state';
  payload: TimesheetContextState;
}
interface ChangeNameAction extends TimesheetActionBase {
  name: 'change-name';
  payload: string;
}
export interface UpdateLineAction extends TimesheetActionBase {
  name: 'update-line';
  payload: TimesheetUpdatePayload;
}
export interface SetLinesAction extends TimesheetActionBase {
  name: 'set-lines';
  payload: TimesheetLinesPayload;
}
export interface AddLinesAction extends TimesheetActionBase {
  name: 'add-lines';
  payload: TimesheetLinesPayload;
}
export interface RemoveLinesAction extends TimesheetActionBase {
  name: 'remove-lines';
  payload: TimesheetDeletePayload;
}

export type TimesheetReducerAction = ResetAction | SetStateAction | ChangeNameAction | UpdateLineAction | SetLinesAction | AddLinesAction | RemoveLinesAction;