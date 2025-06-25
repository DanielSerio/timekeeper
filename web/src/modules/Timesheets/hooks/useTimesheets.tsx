import type { ListResponse } from "#core/types/response/app.response-types";
import { createMockTimesheets, type MockTimesheet } from "#core/utilities/mock";
import { useQuery } from "@tanstack/react-query";

const { categories, timesheets } = createMockTimesheets(11);

export const MOCK_CATEGORIES = categories;

export function useTimesheets() {
  return useQuery({
    queryKey: ["timesheet", "list"],
    async queryFn() {
      //TODO: this. currently returning mock data
      return await new Promise<ListResponse<MockTimesheet>>((resolve) => {
        setTimeout(() => {
          resolve({
            paging: {
              limit: 25,
              offset: 0,
              totals: {
                pages: 1,
                record: timesheets.length,
              },
            },
            records: timesheets,
          });
        }, 500);
      });
    },
  });
}
