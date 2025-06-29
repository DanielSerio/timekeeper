import { TimesheetLineCreate } from "#shared/types/models/timesheet-line.model-types";
import { TimesheetCreate } from "#shared/types/models/timesheet.model-types";

export class CreateTimesheetLineDto implements TimesheetLineCreate {
  id?: number;
  timesheetId?: number;
  categoryId: number;
  startTime: string;
  endTime: string;
  note: string | null;
}

export class CreateTimesheetDto implements TimesheetCreate {
  date: Date;
  name?: string | null | undefined;
  lines: CreateTimesheetLineDto[];
}

