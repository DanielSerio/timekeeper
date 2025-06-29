import { type ComboboxItem } from "@mantine/core";
import { TimesheetCell } from "./TimesheetCell";
import { CategorySelect } from "#categories/components/CategorySelect";

export function TimesheetCategoryCell({
  categoryId,
  onChange,
}: {
  categoryId: number | null;
  onChange: (value: string | null, option: ComboboxItem) => void;
}) {
  return (
    <TimesheetCell name="category">
      <CategorySelect categoryId={categoryId} onChange={onChange} />
    </TimesheetCell>
  );
}
