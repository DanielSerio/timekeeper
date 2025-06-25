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
import { TbPlus } from "react-icons/tb";
import { Table } from "#core/components/Table/Table";
import { useTimesheets } from "#timesheets/hooks/useTimesheets";
import { useTimesheetListModal } from "#timesheets/hooks/useTimesheetListModal";
import { useTable } from "#core/hooks/useTable";
import { TIMESHEET_COLUMNS } from "#timesheets/const";
import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import { getColumnAlign } from "#core/utilities/table/get-column-align";
import { classNames } from "#core/utilities/attribute";
import { isActionColumn } from "#core/utilities/table";
import { TimesheetsTableCell } from "./TimesheetsTableCell";
import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

export function TimesheetsTable() {
  const navigate = useNavigate();
  const timesheetsQuery = useTimesheets();
  const [modalState, modalMethods] = useTimesheetListModal();
  const {
    gridTemplateColumns,
    rowSelectionController: [rowSelection, setRowSelection],
    editModeController: [isEditMode, setIsEditMode],
    table,
  } = useTable({
    columns: TIMESHEET_COLUMNS,
    query: timesheetsQuery,
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
  const onActionClick = (timesheet: TimesheetRecord) =>
    navigate({
      to: `/timesheets/${timesheet.id}`,
      search: { mode: "edit" }, //TODO: this should determine the default mode on the timesheet page
    });

  const onViewActionClick = (timesheet: TimesheetRecord) =>
    navigate({
      to: `/timesheets/${timesheet.id}`,
      search: { mode: "view" }, //TODO: this should determine the default mode on the timesheet page
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
                  <Text>Create Timesheet</Text>
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
        <p>Modal</p>
      </Modal>
    </>
  );
}
