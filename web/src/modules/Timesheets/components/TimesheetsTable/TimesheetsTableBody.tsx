import type { ReactNode } from "react";
import { Box, Button, Checkbox } from "@mantine/core";
import { Table } from "#core/components/Table/Table";
import { classNames } from "#core/utilities/attribute";
import { isActionColumn } from "#core/utilities/table";
import { getColumnAlign } from "#core/utilities/table/get-column-align";
import { TIMESHEET_COLUMNS } from "#timesheets/const";
import { useTimesheetsTable } from "#timesheets/hooks/useTimesheetsTable";
import { TimesheetsTableCell } from "./TimesheetsTableCell";

export function TimesheetsTableBody() {
  const [
    { timesheetsQuery, gridTemplateColumns, table, rowSelection, isEditMode },
    { setRowSelection, onActionClick, onViewActionClick },
  ] = useTimesheetsTable();

  return (
    <Table.TableBody>
      {timesheetsQuery.isLoading && (
        <>
          {[...new Array(5)].map((_, i) => (
            <Table.SkeletonRow
              key={`i:${i}`}
              gridTemplateColumns={gridTemplateColumns}
            />
          ))}
        </>
      )}
      {!timesheetsQuery.isLoading &&
        timesheetsQuery.data?.records?.length === 0 && (
          <Table.Message
            gridTemplateColumns={gridTemplateColumns}
            message="No records found"
          />
        )}
      {!timesheetsQuery.isLoading &&
        !!timesheetsQuery.data &&
        table.getRowModel().flatRows.map((row) => {
          const allCells = row.getVisibleCells();

          return (
            <Table.TableRow
              key={row.id}
              gridTemplateColumns={gridTemplateColumns}
            >
              {allCells.flatMap((cell) => {
                const columnId = cell.column.columnDef.id!;
                const isActionCol = isActionColumn(columnId, TIMESHEET_COLUMNS);
                const align = getColumnAlign(columnId, TIMESHEET_COLUMNS);

                if (columnId === "select") {
                  return (
                    <Box
                      className={classNames(
                        `checkbox-cell`,
                        align ? `align-${align}` : null
                      )}
                      key={cell.id}
                    >
                      <Checkbox
                        size="xs"
                        checked={rowSelection[row.index] ?? false}
                        onChange={(ev) =>
                          setRowSelection((current) => {
                            return {
                              ...current,
                              [row.index]: ev.target.checked,
                            };
                          })
                        }
                      />
                    </Box>
                  );
                }

                if (isActionCol) {
                  return (
                    <TimesheetsTableCell
                      name={cell.column.columnDef.header as string}
                      align={align}
                      key={cell.id}
                    >
                      <Button
                        className="cell-action"
                        size="compact-xs"
                        onClick={() => {
                          if (isEditMode) {
                            onActionClick(row.original);
                          } else {
                            onViewActionClick(row.original);
                          }
                        }}
                      >
                        {cell.renderValue() as ReactNode}
                      </Button>
                    </TimesheetsTableCell>
                  );
                }

                return (
                  <TimesheetsTableCell
                    key={cell.id}
                    align={align}
                    name={cell.column.columnDef.header as string}
                  >
                    {cell.renderValue() as ReactNode}
                  </TimesheetsTableCell>
                );
              })}
            </Table.TableRow>
          );
        })}
    </Table.TableBody>
  );
}
