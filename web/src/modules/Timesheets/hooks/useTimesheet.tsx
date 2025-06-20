import { createMockTimesheets } from "#core/utilities/mock";
import { useQuery } from "@tanstack/react-query";

const { categories, timesheets } = createMockTimesheets(3);

export const MOCK_CATEGORIES = categories;

export function useTimesheet(id: number) {
  return useQuery({
    queryKey: ["timesheet", id],
    async queryFn() {
      //TODO: this. currently returning mock data
      return timesheets[2];
    },
  });
}
