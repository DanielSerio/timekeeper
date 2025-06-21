import type { CategoryRecord } from "#core/types/models/category.model-types";
import type { TimesheetLineRecord } from "#core/types/models/timesheet-line.model-types";
import type { ExtendedTimesheetRecord } from "#core/types/models/timesheet.model-types";

function createMockCategories() {
  const names = ["Meeting", "Development", "Deployment", "Work Session"];
  const oldDate = new Date("2024-12-12");
  const today = new Date();

  function createMockCategory(
    name: string,
    index: number,
    _: string[]
  ): CategoryRecord {
    const id = index + 1;

    return {
      id,
      name,
      createdAt: oldDate,
      lastUpdatedAt: Math.random() > 0.5 ? null : today,
    };
  }

  return names.map((...params) =>
    createMockCategory(...params)
  ) as CategoryRecord[];
}

function createMockTimesheetLines({
  timesheetId,
  idStartsAt,
}: {
  timesheetId: number;
  idStartsAt: number;
}): Omit<TimesheetLineRecord, "lineNo">[] {
  const params = [
    {
      timesheetId,
      categoryId: 2,
      startTime: "07:45",
      endTime: "08:45",
      note: null,
    },
    {
      timesheetId,
      categoryId: 1,
      startTime: "08:45",
      endTime: "09:00",
      note: "Standup",
    },
    {
      timesheetId,
      categoryId: 2,
      startTime: "09:00",
      endTime: "11:15",
      note: "Project #1 development",
    },
    {
      timesheetId,
      categoryId: 2,
      startTime: "11:15",
      endTime: "12:00",
      note: "Project #2 development - comments",
    },
    {
      timesheetId,
      categoryId: 2,
      startTime: "12:45",
      endTime: "14:00",
      note: "Project #2 development",
    },
    {
      timesheetId,
      categoryId: 4,
      startTime: "14:00",
      endTime: "15:00",
      note: "Session - Teammate #1",
    },
    {
      timesheetId,
      categoryId: 3,
      startTime: "15:00",
      endTime: "16:00",
      note: null,
    },
    {
      timesheetId,
      categoryId: 2,
      startTime: "16:00",
      endTime: "17:30",
      note: "Project #2 development",
    },
  ];

  return params.map((params, idx) => ({
    id: idx + idStartsAt,
    createdAt: new Date(),
    lastUpdatedAt: null,
    ...params,
  }));
}

export type MockTimesheet = Omit<ExtendedTimesheetRecord, "lines"> & {
  lines: Omit<TimesheetLineRecord, "lineNo">[];
};

export function createMockTimesheets(count: number = 8): {
  categories: CategoryRecord[];
  timesheets: MockTimesheet[];
} {
  const categories = createMockCategories();
  const timesheets = [];
  let lineId = 1;

  for (let i = 0; i < count; i += 1) {
    const id = i + 1;

    timesheets.push({
      id,
      date: new Date(),
      name: `Timesheet #${id}`,
      lastUpdatedAt: null,
      lines: createMockTimesheetLines({
        timesheetId: id,
        idStartsAt: lineId,
      }),
    });

    lineId += 8;
  }

  return {
    categories,
    timesheets,
  };
}
