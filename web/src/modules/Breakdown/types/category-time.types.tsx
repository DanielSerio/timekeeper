export type CategoryTimeRangeKey =
  | "pastWeek"
  | "pastMonth"
  | "pastQuarter"
  | "pastYear"
  | "custom";

export interface CategoryTimeRangeOptions {
  label: string;
  value: CategoryTimeRangeKey;
}
