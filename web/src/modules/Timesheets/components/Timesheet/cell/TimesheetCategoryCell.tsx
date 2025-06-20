import { Select, type ComboboxItem } from "@mantine/core";
import { TimesheetCell } from "./TimesheetCell";

export function TimesheetCategoryCell({
  categoryId,
  onChange,
}: {
  categoryId: number;
  onChange: (value: string | null, option: ComboboxItem) => void;
}) {
  return (
    <TimesheetCell name="category">
      <Select
        size="xs"
        value={categoryId ? categoryId.toString() : null}
        onChange={onChange}
        data={[
          {
            value: "",
            label: "-- Select Category --",
          },
          {
            value: "1",
            label: "Meeting",
          },
          {
            value: "2",
            label: "Development",
          },
          {
            value: "3",
            label: "Deployment",
          },
          {
            value: "4",
            label: "Work Session",
          },
        ]}
      />
    </TimesheetCell>
  );
}
