import { useQuery } from "@tanstack/react-query";
import { createMockTimesheets } from "#core/utilities/mock";
import { TimesheetService } from "#timesheets/services/timesheet.service";

const { categories } = createMockTimesheets(3);

export const MOCK_CATEGORIES = categories;

export function useTimesheet(id: number) {
  return useQuery({
    queryKey: ["timesheet", id],
    async queryFn() {
      return await TimesheetService.findTimesheet(id);
    },
  });
}
