import { Box, Checkbox } from "@mantine/core";
import { Table } from "#core/components/Table/Table";
import { classNames } from "#core/utilities/attribute";
import { getColumnAlign } from "#core/utilities/table/get-column-align";
import { TIMESHEET_COLUMNS } from "#timesheets/const";
import { useTimesheetsTable } from "#timesheets/hooks/useTimesheetsTable";

export function TimesheetsTableHead() {
  const [
    {
      gridTemplateColumns,
      table,
      allRowsSelected: allSelected,
      noRowsSelected: noneSelected,
    },
    { onChangeSelectionStateForAll },
  ] = useTimesheetsTable();

  return (
    <Table.TableHead gridTemplateColumns={gridTemplateColumns}>
      {table.getVisibleLeafColumns().map((col) => {
        const columnId = col.columnDef.id!;
        const headerText = col.columnDef.header! as string; // header is always defined due to our custom type
        const align = getColumnAlign(columnId, TIMESHEET_COLUMNS);
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
                checked={allSelected}
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
