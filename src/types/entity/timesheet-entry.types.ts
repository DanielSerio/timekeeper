import type { DeleteObject } from "../api.types";

interface TimesheetEntryBase {
  id?: number;
  timesheet_id?: string;
  client_id?: string;
  start_time?: Date | string;
  end_time?: Date | string;
  note?: string | null;
}

export interface TimesheetEntryCreate extends TimesheetEntryBase {
  timesheet_id: string;
  client_id: string;
  start_time: Date | string;
  end_time: Date | string;
}

export interface TimesheetEntryUpdate extends TimesheetEntryBase {
  id?: never;
  timesheet_id?: never;
  client_id: never;
}

export type TimesheetEntryDelete = DeleteObject;

