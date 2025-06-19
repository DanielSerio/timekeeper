import type { Pretty } from "../utility";

interface TimesheetLineBasis {
  timesheetId?: number | null;
  categoryId?: number | null;
  note?: string | null;
  startTime?: string | null;
  endTime?: string | null;
}

interface EmptyTimesheetLineBase extends TimesheetLineBasis {
  timesheetId?: number | null;
  categoryId: number | null;
  note: string | null;
  startTime: string | null;
  endTime: string | null;
}
interface CreateTimesheetLineBase extends TimesheetLineBasis {
  id?: null;
  timesheetId?: number;
  categoryId: number;
  startTime: string;
  endTime: string;
  note: string | null;
}
interface UpdateTimesheetLineBase extends TimesheetLineBasis {
  id?: number | null;
  timesheetId?: never;
  categoryId?: number;
  startTime?: string;
  endTime?: string;
  note?: string | null;
}
interface RecordTimesheetLineBase extends TimesheetLineBasis {
  id: number;
  createdAt: Date;
  lastUpdatedAt: Date | null;
  timesheetId: number;
  categoryId: number;
  startTime: string;
  endTime: string;
  note: string | null;
}

export type EmptyTimesheetLine = Pretty<EmptyTimesheetLineBase>;
export type TimesheetLineCreate = Pretty<CreateTimesheetLineBase>;
export type TimesheetLineUpdate = Pretty<UpdateTimesheetLineBase>;
export type TimesheetLineRecord = Pretty<RecordTimesheetLineBase>;