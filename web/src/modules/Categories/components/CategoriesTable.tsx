import { CATEGORY_COLUMNS } from "#categories/const";
import { useCategories } from "#categories/hooks/useCategories";
import { Table } from "#core/components/Table/Table";
import { useTable } from "#core/hooks/useTable";
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
import { useCategoryListModal } from "#categories/hooks/useCategoryListModal";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { TbPlus } from "react-icons/tb";

export function CategoriesTable() {
  const categoriesQuery = useCategories();
  const [modalState, modalMethods] = useCategoryListModal();
  const {
    gridTemplateColumns,
    rowSelectionController: [rowSelection, setRowSelection],
    editModeController: [isEditMode, setIsEditMode],
    table,
  } = useTable({
    columns: CATEGORY_COLUMNS,
    query: categoriesQuery,
  });
  const count = table.getRowModel().rows.length;

  const onChangeSelectionStateForAll = (value: boolean) =>
    setRowSelection(() => {
      const newSelection: Record<number, boolean> = {};

      for (let i = 0; i < count; i++) {
        newSelection[i] = value;
      }

      return newSelection;
    });

  const selectedRows = Object.entries(rowSelection).filter(([_, v]) => v);
  const allSelected = selectedRows.length === count;
  const noneSelected = selectedRows.length === 0;

  const onCreateClick = () => modalMethods.open();
  const onActionClick = (category: CategoryRecord) =>
    modalMethods.open({
      category,
    });

  return (
    <>
      <Flex className="table-toolbar" p="xs" align="center" justify="flex-end">
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
              <Button onClick={onCreateClick} size="xs">
                <Group gap={4}>
                  <Text>Create Category</Text>
                  <TbPlus />
                </Group>
              </Button>
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
                                  [row.index]:
                                    ev.currentTarget?.checked ?? false,
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
        opened={modalState !== null}
        onClose={() => modalMethods.dismiss()}
      >
        <p>{JSON.stringify(modalState, null, 2)}</p>
      </Modal>
    </>
  );
}
