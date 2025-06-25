import {
  Flex,
  Group,
  Select,
  TextInput,
  type ComboboxItem,
} from "@mantine/core";
import type { CategoryTimeRangeKey } from "#breakdown/types";

export function CategoryTimeCardControls({
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
