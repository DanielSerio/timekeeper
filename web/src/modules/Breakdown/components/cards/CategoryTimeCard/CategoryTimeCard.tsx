import type { Interval } from "date-fns";
import {
  Flex,
  Group,
  Select,
  TextInput,
  type ComboboxItem,
} from "@mantine/core";
import { BreakdownCard } from "../../BreakdownCard";
import { useCategoryTime } from "#breakdown/hooks/useCategoryTime";
import type { CategoryTimeRangeKey } from "#breakdown/types";
import { TimeByCategoryChart } from "#breakdown/components/charts/TimeByCategoryChart";

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

function CategoryTimeCardControls({
  value,
  options,
  startDate,
  endDate,
  onChange,
  onIntervalChange,
}: {
  value?: CategoryTimeRangeKey | (string & {});
  startDate?: Date;
  endDate?: Date;
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string | null, option: ComboboxItem) => void;
  onIntervalChange?: (start: Date, end: Date) => void;
}) {
  const parsedStartDate = startDate ? new Date(startDate) : undefined;
  const parsedEndDate = endDate ? new Date(endDate) : undefined;
  const getDateString = (date: Date | undefined) =>
    date ? date.toISOString().split("T")[0] : "";

  return (
    <Group wrap="wrap">
      <Select
        w="100%"
        required
        label="Range"
        data={options}
        value={value}
        onChange={onChange}
      />
      {value === "custom" && (
        <Flex gap="md" w="100%">
          <TextInput
            flex={1}
            type="date"
            required
            max={getDateString(endDate)}
            label="Start"
            value={getDateString(startDate)}
            onChange={(ev) => {
              const newStart = ev.currentTarget.valueAsDate;

              if (newStart && parsedEndDate && onIntervalChange) {
                onIntervalChange?.(newStart, parsedEndDate);
              }
            }}
          />
          <TextInput
            flex={1}
            type="date"
            required
            min={getDateString(startDate)}
            label="End"
            value={getDateString(endDate)}
            onChange={(ev) => {
              const newEnd = ev.currentTarget.valueAsDate;

              if (newEnd && parsedStartDate && onIntervalChange) {
                onIntervalChange?.(parsedStartDate, newEnd);
              }
            }}
          />
        </Flex>
      )}
    </Group>
  );
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
