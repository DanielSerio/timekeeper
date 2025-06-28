import { ApiService } from "#core/services/api.service";
import type { TimesheetCreate, TimesheetRecord } from "#core/types/models/timesheet.model-types";
import type { ListResponse, PagingRequest } from "#core/types/response/app.response-types";


class TimesheetServiceCtor extends ApiService {
  async listTimesheets({ limit, offset }: PagingRequest) {
    const response = await this.GET(`/timesheets?limit=${limit}&offset=${offset}`);

    return await response.json() as ListResponse<TimesheetRecord>;
  }

  async createTimesheet(body: TimesheetCreate) {
    const response = await this.POST('/timesheets', {
      body: JSON.stringify(body)
    });

    return await response.json() as TimesheetRecord;
  }

  async updateTimesheet() { }

  async deleteTimesheets(ids: number[]) {
    const response = await this.PATCH('/timesheets/delete', {
      body: JSON.stringify(ids)
    });

    return await response.json() as TimesheetRecord;
  }
}

export const TimesheetService = new TimesheetServiceCtor();