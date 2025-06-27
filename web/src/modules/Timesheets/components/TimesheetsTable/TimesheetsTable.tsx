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
import { TbPlus, TbTrash } from "react-icons/tb";
import { Table } from "#core/components/Table/Table";
import { TIMESHEET_COLUMNS } from "#timesheets/const";
import { getColumnAlign } from "#core/utilities/table/get-column-align";
import { classNames } from "#core/utilities/attribute";
import { isActionColumn } from "#core/utilities/table";
import { TimesheetsTableCell } from "./TimesheetsTableCell";
import type { ReactNode } from "react";
import { useTimesheetsTable } from "#timesheets/hooks/useTimesheetsTable";
import { Pagination } from "#core/components/Pagination/Pagination";

export function TimesheetsTable() {
  const [
    {
      timesheetsQuery,
      gridTemplateColumns,
      table,
      rowSelection,
      isEditMode,
      modalState,
      totalRecords,
      paging,
      allRowsSelected: allSelected,
      noRowsSelected: noneSelected,
    },
    {
      setIsEditMode,
      setRowSelection,
      onCreateClick,
      onActionClick,
      onViewActionClick,
      onDeleteClick,
      onChangeSelectionStateForAll,
      modalMethods,
      pagingMethods,
    },
  ] = useTimesheetsTable();

  return (
    <>
      <Flex
        className="table-toolbar"
        p="xs"
        align="center"
        justify="space-between"
      >
        <Group>
          <Pagination
            totalRecords={totalRecords}
            limit={paging.limit}
            offset={paging.offset}
            pagingMethods={pagingMethods}
          />
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
              <Button
                color="red"
                onClick={onDeleteClick}
                disabled={noneSelected}
                size="xs"
                title={"Remove Timesheets"}
              >
                <Group gap={4}>
                  <Text visibleFrom="sm" size="xs">
                    Remove Timesheets
                  </Text>
                  <TbTrash />
                </Group>
              </Button>
              <Button
                onClick={onCreateClick}
                size="xs"
                title="Create Timesheet"
              >
                <Group gap={4}>
                  <Text size="xs" visibleFrom="sm">
                    Create Timesheet
                  </Text>
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
      <Table name="timesheets">
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
                    const isActionCol = isActionColumn(
                      columnId,
                      TIMESHEET_COLUMNS
                    );
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
      </Table>
      <Modal
        opened={modalState !== null}
        onClose={() => modalMethods.dismiss()}
      >
        <p>Create Modal</p>
      </Modal>
    </>
  );
}
