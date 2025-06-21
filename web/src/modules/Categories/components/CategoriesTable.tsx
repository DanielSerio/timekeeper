import { CATEGORY_COLUMNS } from "#categories/const";
import { useCategories } from "#categories/hooks/useCategories";
import { Table } from "#core/components/Table/Table";
import { useTable } from "#core/hooks/useTable";
import { isActionColumn } from "#core/utilities/table";
import { Box, Button, Checkbox, Switch } from "@mantine/core";
import type { ReactNode } from "react";

export function CategoriesTable() {
  const categoriesQuery = useCategories();
  const {
    gridTemplateColumns,
    editModeController: [isEditMode, setIsEditMode],
    table,
  } = useTable({
    columns: CATEGORY_COLUMNS,
    query: categoriesQuery,
  });

  return (
    <>
      <header>
        <Switch
          label="Edit Mode"
          checked={isEditMode}
          onChange={(ev) => setIsEditMode(ev.target.checked)}
        />
      </header>
      <Table name="category">
        <Table.TableHead gridTemplateColumns={gridTemplateColumns}>
          {table.getVisibleLeafColumns().map((col) => {
            const headerText = col.columnDef.header! as string; // header is always defined due to our custom type

            return <Box key={col.id}>{headerText}</Box>;
          })}
        </Table.TableHead>
        <Table.TableBody>
          {!categoriesQuery.isLoading &&
            !!categoriesQuery.data &&
            table.getRowModel().flatRows.map((row) => {
              const allCells = row.getVisibleCells();
              console.info("allCells", allCells);
              return (
                <Table.TableRow
                  key={row.id}
                  gridTemplateColumns={gridTemplateColumns}
                >
                  {allCells.flatMap((cell) => {
                    const columnId = cell.column.columnDef.id!;
                    console.info(columnId);

                    if (columnId === "select") {
                      return (
                        <Box key={cell.id}>
                          <Checkbox />
                        </Box>
                      );
                    }

                    if (isActionColumn(columnId, CATEGORY_COLUMNS)) {
                      return (
                        <Box key={cell.id}>
                          <Button disabled={!isEditMode}>
                            {cell.renderValue() as ReactNode}
                          </Button>
                        </Box>
                      );
                    }

                    return (
                      <Box key={cell.id}>{cell.renderValue() as ReactNode}</Box>
                    );
                  })}
                </Table.TableRow>
              );
            })}
        </Table.TableBody>
      </Table>
    </>
  );
}
