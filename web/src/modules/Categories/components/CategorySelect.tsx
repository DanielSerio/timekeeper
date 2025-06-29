import { useCategories } from "#categories/hooks/useCategories";
import { Select, type ComboboxItem } from "@mantine/core";
import { forwardRef, useMemo, type ForwardedRef } from "react";

function CategorySelectComponent(
  {
    categoryId,
    disabled,
    onChange,
  }: {
    categoryId: number | null;
    disabled?: boolean;
    onChange: (value: string | null, option: ComboboxItem) => void;
  },
  ref?: ForwardedRef<HTMLInputElement>
) {
  const { query } = useCategories();
  const { data, isLoading } = query;

  const options = useMemo(() => {
    if (isLoading || !data) {
      return [
        {
          value: "",
          label: "-- Loading... --",
        },
      ];
    }

    return data.records.map(({ name, id }) => ({
      value: `${id}`,
      label: name,
    }));
  }, [data, isLoading]);

  return (
    <Select
      ref={ref}
      disabled={disabled || isLoading}
      size="xs"
      value={categoryId ? categoryId.toString() : null}
      onChange={onChange}
      data={options}
    />
  );
}

export const CategorySelect = forwardRef(CategorySelectComponent);
