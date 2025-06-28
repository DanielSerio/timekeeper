import { ApiService } from "#core/services/api.service";
import type { TimesheetLineCreate, TimesheetLineUpdate } from "#core/types/models/timesheet-line.model-types";

export interface LinesOperation {
  lines?: (TimesheetLineCreate | TimesheetLineUpdate)[];
  deleteLines?: number[];
}

export interface FullTimesheetUpdate extends LinesOperation {
  date?: Date;
  name?: string | null | undefined;
}

class TimesheetUpdateServiceCtor extends ApiService {
  async updateTimesheet(id: number, update: FullTimesheetUpdate) {
    const response = await this.PATCH(`/timesheets/${id}`, {
      body: JSON.stringify(update)
    });

    return await response.json();
  }
}

export const TimesheetUpdateService = new TimesheetUpdateServiceCtor();