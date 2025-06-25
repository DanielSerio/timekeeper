import type { CategoryRecord } from "#core/types/models/category.model-types";
import { MOCK_CATEGORIES } from "#timesheets/hooks/useTimesheet";
import type { useViewTimesheetMode } from "#timesheets/hooks/useViewTimesheetMode";
import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { useQuery } from "@tanstack/react-query";
import { ViewCategoryTimesheet } from "./ViewCategoryTimesheet/ViewCategoryTimesheet";
import { ViewTimeTimesheet } from "./ViewTimeTimesheet/ViewTimeTimesheet";
import { TimesheetHeader } from "../Timesheet/TimesheetHeader";

async function simulateCategoriesGet() {
  return await new Promise<CategoryRecord[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CATEGORIES);
    }, 600);
  });
}

const useMockCategories = () =>
  useQuery({
    queryKey: ["mock", "categories"],
    async queryFn() {
      return await simulateCategoriesGet();
    },
  });

export function ViewTimesheet({
  isLoading,
  viewTimesheetController: [viewMode],
}: {
  isLoading?: boolean;
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  const [timesheetCtx] = useTimesheetContext();
  const categoriesQuery = useMockCategories();

  if (viewMode === "By Category") {
    return (
      <>
        <TimesheetHeader />
        <ViewCategoryTimesheet
          isLoading={isLoading || categoriesQuery.isLoading}
          timesheet={timesheetCtx}
          categories={categoriesQuery.data}
        />
      </>
    );
  }

  return (
    <>
      <TimesheetHeader />
      <ViewTimeTimesheet
        isLoading={isLoading || categoriesQuery.isLoading}
        timesheet={timesheetCtx}
        categories={categoriesQuery.data}
      />
    </>
  );
}
