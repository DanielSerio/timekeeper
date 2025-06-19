import { Pretty } from "../utility";

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
  timesheetId?: number;
  categoryId: number;
  startTime: string;
  endTime: string;
  note: string | null;
}
interface UpdateTimesheetLineBase extends TimesheetLineBasis {
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

export type EmptyTimesheeLine = Pretty<EmptyTimesheetLineBase>;
export type TimesheeLineCreate = Pretty<CreateTimesheetLineBase>;
export type TimesheeLineUpdate = Pretty<UpdateTimesheetLineBase>;
export type TimesheeLineRecord = Pretty<RecordTimesheetLineBase>;