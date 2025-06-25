import type { Interval } from "date-fns";

import { BreakdownCard } from "../../BreakdownCard";
import { useCategoryTime } from "#breakdown/hooks/useCategoryTime";
import type { CategoryTimeRangeKey } from "#breakdown/types";
import { TimeByCategoryChart } from "#breakdown/components/charts/TimeByCategoryChart";
import { CategoryTimeCardControls } from "./CategoryTimeCardControls";

function getCardTitle(key: CategoryTimeRangeKey, customRange?: Interval) {
  switch (key) {
    case "pastWeek":
      return "Past Week";
    case "pastMonth":
      return "Past Month";
    case "pastQuarter":
      return "Past Quarter";
    case "pastYear":
      return "Past Year";
    case "custom":
      if (customRange) {
        const startDate = new Date(Date.parse(`${customRange.start}`));
        const endDate = new Date(Date.parse(`${customRange.end}`));

        return `Custom Range: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      }
      return "Custom Range";
    default:
      return "Unknown Range";
  }
}

export function CategoryTimeCard() {
  const [options, { selectedOption, dateInterval }, methods] = useCategoryTime(
    {}
  );

  const handleIntervalTypeChange = (value: string | null) => {
    if (value) {
      methods.selectOption(value as CategoryTimeRangeKey);
    }
  };

  return (
    <BreakdownCard
      title={[
        `Time By Category`,
        `${getCardTitle(selectedOption, dateInterval)}`,
      ]}
      renderActions={() => (
        <CategoryTimeCardControls
          options={options}
          value={selectedOption}
          onChange={handleIntervalTypeChange}
          startDate={dateInterval.start as Date | undefined}
          endDate={dateInterval.end as Date | undefined}
          onIntervalChange={(start, end) => {
            methods.setCustomDateInterval(start, end);
          }}
        />
      )}
    >
      <TimeByCategoryChart />
    </BreakdownCard>
  );
}
