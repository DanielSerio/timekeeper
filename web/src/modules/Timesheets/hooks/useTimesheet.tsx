import type { ExtendedTimesheetRecord } from "#core/types/models/timesheet.model-types";
import { useQuery } from "@tanstack/react-query";

export function useTimesheet(id: number) {
  return useQuery({
    queryKey: ["timesheet", id],
    async queryFn() {
      //TODO: this. currently returning mock data
      return {
        id,
        lastUpdatedAt: null,
        name: `Test Timesheet #${id}`,
        date: new Date(),
        lines: [],
      } satisfies ExtendedTimesheetRecord;
    },
  });
}
