
import type { Pretty } from "../utility";
import { type TimesheetLineCreate, type TimesheetLineRecord, type TimesheetLineUpdate } from "./timesheet-line.model-types";

interface TimesheetBasis {
  date?: Date;
  name?: string | null;
}

interface TimesheetCreateBase extends TimesheetBasis {
  date: Date;
  name?: string | null;
}

interface TimesheetUpdateBase extends TimesheetBasis {
  date?: Date;
  name?: string | null;
}

interface TimesheetRecordBase extends TimesheetCreateBase {
  name: string;
  id: number;
  lastUpdatedAt: Date | null;
}

export type TimesheetCreate = Pretty<TimesheetCreateBase> & { lines: TimesheetLineCreate[]; };
export type TimesheetUpdate = Pretty<TimesheetUpdateBase>;
export type TimesheetRecord = Pretty<TimesheetRecordBase>;

interface SaveLines {
  lines: (TimesheetLineCreate | TimesheetLineUpdate | TimesheetLineRecord)[];
  deleteLines: number[] | null;
}

export type ExtendedTimesheetCreate = Pretty<TimesheetCreateBase & { lines: TimesheetLineCreate[]; }>;
export type ExtendedTimesheetUpdate = Pretty<Omit<TimesheetRecordBase, 'id' | 'lastUpdatedAt' | 'date'> & SaveLines>;
export type ExtendedTimesheetRecord = Pretty<TimesheetRecordBase & { lines: TimesheetLineRecord[]; }>;