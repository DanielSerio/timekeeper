import { ApiService } from "#core/services/api.service";
import type { ExtendedTimesheetUpdate } from "#core/types/models/timesheet.model-types";

class TimesheetUpdateServiceCtor extends ApiService {
  async updateTimesheet(id: number, update: ExtendedTimesheetUpdate) {
    const response = await this.PATCH(`/timesheets/${id}`, {
      body: JSON.stringify({
        ...update,
        deleteLines: update.deleteLines ?? null
      })
    });

    return await response.json();
  }
}

export const TimesheetUpdateService = new TimesheetUpdateServiceCtor();