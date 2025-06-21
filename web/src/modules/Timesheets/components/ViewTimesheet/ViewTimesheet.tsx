import { MOCK_CATEGORIES } from "#timesheets/hooks/useTimesheet";
import type { useViewTimesheetMode } from "#timesheets/hooks/useViewTimesheetMode";
import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { ViewCategoryTimesheet } from "./ViewCategoryTimesheet/ViewCategoryTimesheet";
import { ViewTimeTimesheet } from "./ViewTimeTimesheet/ViewTimeTimesheet";

export function ViewTimesheet({
  viewTimesheetController: [viewMode],
}: {
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  const [timesheetCtx] = useTimesheetContext();
  const categories = MOCK_CATEGORIES;

  if (viewMode === "By Category") {
    return (
      <ViewCategoryTimesheet timesheet={timesheetCtx} categories={categories} />
    );
  }

  return <ViewTimeTimesheet timesheet={timesheetCtx} categories={categories} />;
}
