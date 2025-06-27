import { CATEGORY_COLUMNS } from "#categories/const";
import { useCategoriesTable } from "#categories/hooks/useCategoriesTable";
import { Table } from "#core/components/Table/Table";
import { classNames } from "#core/utilities/attribute";
import { getColumnAlign } from "#core/utilities/table/get-column-align";
import { Box, Checkbox } from "@mantine/core";

export function CategoriesTableHead() {
  const [
    {
      allRowsSelected: allSelected,
      noRowsSelected: noneSelected,
      gridTemplateColumns,
      table,
      totalRecords,
    },
    { onChangeSelectionStateForAll },
  ] = useCategoriesTable();

  return (
    <Table.TableHead gridTemplateColumns={gridTemplateColumns}>
      {table.getVisibleLeafColumns().map((col) => {
        const columnId = col.columnDef.id!;
        const headerText = col.columnDef.header! as string; // header is always defined due to our custom type
        const align = getColumnAlign(columnId, CATEGORY_COLUMNS);
        const classes = classNames(
          "header-cell",
          headerText === "" ? `checkbox-cell` : null,
          align ? `align-${align}` : null
        );
        if (headerText === "") {
          return (
            <Box className={classes} key={col.id}>
              <Checkbox
                size="xs"
                checked={allSelected && totalRecords > 0}
                indeterminate={!allSelected && !noneSelected}
                onChange={(ev) =>
                  onChangeSelectionStateForAll(ev.currentTarget.checked)
                }
              />
            </Box>
          );
        }

        return (
          <Box className={classes} key={col.id}>
            {headerText}
          </Box>
        );
      })}
    </Table.TableHead>
  );
}
