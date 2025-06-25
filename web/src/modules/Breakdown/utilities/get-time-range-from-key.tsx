import type { CategoryTimeRangeKey } from "#breakdown/types";
import type { Interval } from "date-fns";

function getStartOfRange(
  key: Omit<CategoryTimeRangeKey, "custom">,
  basis: Date
): Date {
  switch (key) {
    case "pastWeek":
      return new Date(
        basis.getFullYear(),
        basis.getMonth(),
        basis.getDate() - 7
      );
    case "pastMonth":
      return new Date(
        basis.getFullYear(),
        basis.getMonth() - 1,
        basis.getDate()
      );
    case "pastQuarter":
      const month = basis.getMonth();
      const quarterStartMonth = month - (month % 3);
      return new Date(basis.getFullYear(), quarterStartMonth, 1);
    case "pastYear":
      return new Date(
        basis.getFullYear() - 1,
        basis.getMonth(),
        basis.getDate()
      );
    default:
      throw new Error(`Unknown time range key: ${key}`);
  }
}

/**
 * Calculates a time range interval based on a given key and the current date.
 */
export function getTimeRangeFromKey(
  key: Exclude<CategoryTimeRangeKey, "custom">
): Interval {
  const basis = new Date();
  const start = getStartOfRange(key, basis);

  return {
    start,
    end: basis,
  };
}
