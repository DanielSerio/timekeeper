import { CATEGORY_COLUMNS } from "#categories/const";
import { Table } from "#core/components/Table/Table";
import { isActionColumn } from "#core/utilities/table";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Modal,
  Switch,
  Text,
} from "@mantine/core";
import type { ReactNode } from "react";
import { CategoriesTableCell } from "./CategoriesTableCell";
import { getColumnAlign } from "#core/utilities/table/get-column-align";
import { classNames } from "#core/utilities/attribute";

import { TbPlus, TbTrash } from "react-icons/tb";
import { CategoryForm } from "./CategoryModal/CategoryForm";
import { useCategoriesTable } from "#categories/hooks/useCategoriesTable";
import { Pagination } from "#core/components/Pagination/Pagination";

export function CategoriesTable() {
  const [
    {
      isEditMode,
      allRowsSelected: allSelected,
      noRowsSelected: noneSelected,
      gridTemplateColumns,
      table,
      categoriesQuery,
      rowSelection,
      modalState,
    },
    {
      onChangeSelectionStateForAll,
      onCreateClick,
      onActionClick,
      onDeleteClick,
      setIsEditMode,
      setRowSelection,
      modalMethods,
    },
  ] = useCategoriesTable();

  return (
    <>
      <Flex
        className="table-toolbar"
        p="xs"
        align="center"
        justify="space-between"
      >
        <Group>
          <Pagination />
        </Group>
        <Group>
          {isEditMode && (
            <>
              <Checkbox
                label="Select All"
                hiddenFrom="sm"
                size="xs"
                checked={allSelected}
                indeterminate={!allSelected && !noneSelected}
                onChange={(ev) =>
                  onChangeSelectionStateForAll(ev.currentTarget.checked)
                }
              />
              <Group>
                <Button
                  color="red"
                  onClick={onDeleteClick}
                  disabled={noneSelected}
                  size="xs"
                  title={"Remove Categories"}
                >
                  <Group gap={4}>
                    <Text visibleFrom="sm" size="xs">
                      Remove Categories
                    </Text>
                    <TbTrash />
                  </Group>
                </Button>
                <Button
                  onClick={onCreateClick}
                  size="xs"
                  title={"Create Category"}
                >
                  <Group gap={4}>
                    <Text visibleFrom="sm" size="xs">
                      Create Category
                    </Text>
                    <TbPlus />
                  </Group>
                </Button>
              </Group>
            </>
          )}
          <Switch
            label="Edit Mode"
            checked={isEditMode}
            onChange={(ev) => setIsEditMode(ev.target.checked)}
          />
        </Group>
      </Flex>
      <Table name="category">
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
                    const isActionCol = isActionColumn(
                      columnId,
                      CATEGORY_COLUMNS
                    );
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
      </Table>
      <Modal
        title={modalState?.category ? "Edit Category" : "Create Category"}
        opened={modalState !== null}
        onClose={() => modalMethods.dismiss()}
      >
        <CategoryForm
          category={modalState?.category}
          dismiss={() => modalMethods.dismiss()}
        />
      </Modal>
    </>
  );
}
