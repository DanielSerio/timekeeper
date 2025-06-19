import { CreateTimesheetLineDto } from "src/timesheets/dto/create-timesheet.dto";
import { Pretty } from "../utility";
import { TimesheeLineCreate } from "./timesheet-line.model-types";

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
  name: string | null;
  id: number;
  lastUpdatedAt: Date | null;
}

export type TimesheetCreate = Pretty<TimesheetCreateBase>;
export type TimesheetUpdate = Pretty<TimesheetUpdateBase>;
export type TimesheetRecord = Pretty<TimesheetRecordBase>;

export type ExtendedTimesheetCreate = Pretty<TimesheetCreateBase & { lines: TimesheeLineCreate[]; }>;