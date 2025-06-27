import { ApiService } from "#core/services/api.service";
import type { PagingRequest } from "#core/types/response/app.response-types";
import { createMockTimesheets } from "#core/utilities/mock";

class TimesheetServiceCtor extends ApiService {
  listTimesheets({ }: PagingRequest) {
    const { timesheets } = createMockTimesheets(11);

    return {
      paging: {
        limit: 25,
        offset: 0,
        totals: {
          pages: 1,
          records: timesheets.length
        }
      },
      records: timesheets
    };
  }
}

export const TimesheetService = new TimesheetServiceCtor();