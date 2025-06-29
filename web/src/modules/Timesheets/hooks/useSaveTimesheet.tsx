import { useMutation } from "@tanstack/react-query";
import type { ExtendedTimesheetUpdate } from "#core/types/models/timesheet.model-types";
import { TimesheetUpdateService } from "#timesheets/services/timesheet-update.service";
//TODO: deleteLines is not working
export function useSaveTimesheet(
  id: number,
  on: {
    onSuccess: () => void;
    onError: (error: Error) => void;
  }
) {
  return useMutation({
    mutationKey: ["timesheet", id, "save"],
    async mutationFn(timesheet: ExtendedTimesheetUpdate) {
      return await TimesheetUpdateService.updateTimesheet(id, timesheet);
    },
    onSuccess: on.onSuccess,
    onError: (err) => on.onError(err),
  });
}
