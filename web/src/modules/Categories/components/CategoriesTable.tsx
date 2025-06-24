import { CATEGORY_COLUMNS } from "#categories/const";
import { useCategories } from "#categories/hooks/useCategories";
import { Table } from "#core/components/Table/Table";
import { useTable } from "#core/hooks/useTable";
import { isActionColumn } from "#core/utilities/table";
import { Box, Button, Checkbox, Flex, Switch } from "@mantine/core";
import type { ReactNode } from "react";
import { CategoriesTableCell } from "./CategoriesTableCell";

export function CategoriesTable() {
  const categoriesQuery = useCategories();
  const {
    gridTemplateColumns,
    rowSelectionController: [rowSelection, setRowSelection],
    editModeController: [isEditMode, setIsEditMode],
    table,
  } = useTable({
    columns: CATEGORY_COLUMNS,
    query: categoriesQuery,
  });

  const onActionClick = () => {
    alert("clicked");
  };

  return (
    <>
      <Flex className="table-toolbar" p="xs" align="center" justify="flex-end">
        <Switch
          label="Edit Mode"
          checked={isEditMode}
          onChange={(ev) => setIsEditMode(ev.target.checked)}
        />
      </Flex>
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

                    if (columnId === "select") {
                      return (
                        <Box key={cell.id}>
                          <Checkbox
                            checked={rowSelection[row.index] ?? false}
                            onChange={(ev) => {
                              if (ev.currentTarget.checked) {
                                setRowSelection((current) => {
                                  return {
                                    ...current,
                                    [row.index]: true,
                                  };
                                });
                              }
                            }}
                          />
                        </Box>
                      );
                    }

                    if (isActionColumn(columnId, CATEGORY_COLUMNS)) {
                      return (
                        <CategoriesTableCell
                          name={cell.column.columnDef.header as string}
                          key={cell.id}
                        >
                          <Button
                            className="cell-action"
                            size="compact-xs"
                            disabled={!isEditMode}
                            onClick={onActionClick}
                          >
                            {cell.renderValue() as ReactNode}
                          </Button>
                        </CategoriesTableCell>
                      );
                    }

                    return (
                      <CategoriesTableCell
                        key={cell.id}
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
      </Table>
    </>
  );
}
