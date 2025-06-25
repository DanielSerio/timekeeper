import { CATEGORY_TIME_OPTIONS } from "#breakdown/const";
import type { CategoryTimeRangeKey } from "#breakdown/types";
import { getTimeRangeFromKey } from "#breakdown/utilities";
import type { Interval } from "date-fns";
import { useCallback, useState } from "react";

export type DefaultCategoryTimeRange =
  | {
      key: "custom";
      interval: Interval;
    }
  | {
      key: Exclude<CategoryTimeRangeKey, "custom">;
      interval?: never;
    };

export interface UseCategoryTimeProps {
  defaultRange?: DefaultCategoryTimeRange;
}

/**
 * Manages category time options, selected time range, and date intervals with custom functionality.
 */
export function useCategoryTime({ defaultRange }: UseCategoryTimeProps) {
  const options = CATEGORY_TIME_OPTIONS;
  const [selectedOption, setSelectedOption] = useState<CategoryTimeRangeKey>(
    defaultRange?.key ?? "pastMonth"
  );
  const [dateInterval, setDateInterval] = useState<Interval>(
    selectedOption === "custom"
      ? (defaultRange?.interval ?? { start: new Date(), end: new Date() })
      : getTimeRangeFromKey(selectedOption)
  );

  const setCustomDateInterval = useCallback(
    (start: Date = new Date(), end: Date = new Date()) =>
      setDateInterval({
        start,
        end,
      }),
    [setDateInterval]
  );

  const selectOption = useCallback(
    (key: CategoryTimeRangeKey) => {
      setSelectedOption(key);
      if (key === "custom") {
        setCustomDateInterval();

        return;
      }

      const newInterval = getTimeRangeFromKey(key);
      setDateInterval(newInterval);
    },
    [setDateInterval, setCustomDateInterval]
  );

  const nonState = options;

  const state = {
    dateInterval,
    selectedOption,
  };

  const methods = {
    setCustomDateInterval,
    selectOption,
  };

  return [nonState, state, methods] as const;
}
