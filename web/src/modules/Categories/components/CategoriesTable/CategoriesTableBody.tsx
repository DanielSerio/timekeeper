import { CATEGORY_COLUMNS } from "#categories/const";
import { useCategoriesTable } from "#categories/hooks/useCategoriesTable";
import { Table } from "#core/components/Table/Table";
import { classNames } from "#core/utilities/attribute";
import { isActionColumn } from "#core/utilities/table";
import { getColumnAlign } from "#core/utilities/table/get-column-align";
import { Box, Button, Checkbox } from "@mantine/core";
import { CategoriesTableCell } from "./CategoriesTableCell";
import type { ReactNode } from "react";

export function CategoriesTableBody() {
  const [
    { isEditMode, gridTemplateColumns, table, categoriesQuery, rowSelection },
    { onActionClick, setRowSelection },
  ] = useCategoriesTable();

  return (
    <Table.TableBody>
      {categoriesQuery.isLoading && (
        <>
          {[...new Array(5)].map((_, i) => (
            <Table.SkeletonRow
              key={`i:${i}`}
              gridTemplateColumns={gridTemplateColumns}
            />
          ))}
        </>
      )}
      {!categoriesQuery.isLoading &&
        categoriesQuery.data?.records?.length === 0 && (
          <Table.Message
            gridTemplateColumns={gridTemplateColumns}
            message="No records found"
          />
        )}
      {!categoriesQuery.isLoading &&
        !!categoriesQuery.data &&
        table.getRowModel().flatRows.map((row) => {
          const allCells = row.getVisibleCells();

          return (
            <Table.TableRow
              key={row.id}
              gridTemplateColumns={gridTemplateColumns}
            >
              {allCells.flatMap((cell) => {
                const columnId = cell.column.columnDef.id!;
                const isActionCol = isActionColumn(columnId, CATEGORY_COLUMNS);
                const align = getColumnAlign(columnId, CATEGORY_COLUMNS);

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
                    <CategoriesTableCell
                      name={cell.column.columnDef.header as string}
                      align={align}
                      key={cell.id}
                    >
                      <Button
                        className="cell-action"
                        size="compact-xs"
                        disabled={!isEditMode}
                        onClick={() => onActionClick(row.original)}
                      >
                        {cell.renderValue() as ReactNode}
                      </Button>
                    </CategoriesTableCell>
                  );
                }

                return (
                  <CategoriesTableCell
                    key={cell.id}
                    align={align}
                    name={cell.column.columnDef.header as string}
                  >
                    {cell.renderValue() as ReactNode}
                  </CategoriesTableCell>
                );
              })}
            </Table.TableRow>
          );
        })}
    </Table.TableBody>
  );
}
