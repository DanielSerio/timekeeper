import { useState } from "react";

export type ViewTimesheetMode = "By Time" | "By Category";

export function useViewTimesheetMode(defaultValue?: ViewTimesheetMode) {
  return useState<ViewTimesheetMode>(defaultValue ?? "By Time");
}
