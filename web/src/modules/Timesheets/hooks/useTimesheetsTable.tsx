import { useNavigate } from "@tanstack/react-router";
import { useTimesheets } from "./useTimesheets";
import { useTimesheetListModal } from "./useTimesheetListModal";
import { useTable } from "#core/hooks/useTable";
import { TIMESHEET_COLUMNS } from "#timesheets/const";
import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import type { Row } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, type PropsWithChildren } from "react";
import { TimesheetService } from "#timesheets/services/timesheet.service";
import { notifications } from "@mantine/notifications";

function useDeleteMutation(
  rowSelection: Record<number, boolean>,
  rows: Row<TimesheetRecord>[],
  on: {
    onSuccess: () => void;
    onError: (error: Error) => void;
  }
) {
  const queryClient = useQueryClient();

  const ids = Object.entries(rowSelection)
    .filter(([_, selected]) => selected)
    .map(
      ([rowIndex]) =>
        rows.find((row) => row.index === +rowIndex)?.original.id ?? null
    )
    .filter((rowId) => rowId !== null);
  return useMutation({
    mutationKey: ["delete", "timesheets", `ids=${ids.toString()}`],
    async mutationFn() {
      await TimesheetService.deleteTimesheets(ids);

      await queryClient.invalidateQueries({
        queryKey: ["timesheets", "list"],
      });
    },
    onSuccess: on.onSuccess,
    onError: (error) => on.onError(error),
  });
}

function useTimesheetsTableState() {
  const navigate = useNavigate();
  const {
    query: timesheetsQuery,
    pagingController: [paging, pagingMethods],
    count: totalRecords,
  } = useTimesheets();
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
  const rowModel = table.getRowModel();
  const count = rowModel.rows.length;

  const deleteMutation = useDeleteMutation(rowSelection, rowModel.rows, {
    onSuccess: () => {
      setIsEditMode(false);

      notifications.show({
        color: "green",
        title: "Success",
        message: `Successfully deleted timesheets`,
      });
    },
    onError(error) {
      setRowSelection({});
      setIsEditMode(false);

      notifications.show({
        color: "red",
        title: "Error",
        message: error.message,
      });
    },
  });

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

  const onDeleteClick = () => deleteMutation.mutateAsync();

  const state = {
    totalRecords,
    paging,
    isEditMode,
    allRowsSelected: allSelected,
    noRowsSelected: noneSelected,
    modalState,
    rowCount: count,
    gridTemplateColumns,
    table,
    rowSelection,
    timesheetsQuery,
  };

  const methods = {
    onChangeSelectionStateForAll,
    onCreateClick,
    onActionClick,
    onViewActionClick,
    onDeleteClick,
    setIsEditMode,
    setRowSelection,
    modalMethods,
    pagingMethods,
  };

  return [state, methods] as const;
}
type TimesheetsTableState = ReturnType<typeof useTimesheetsTableState>;

const TimesheetsTableCtx = createContext<TimesheetsTableState | null>(null);

export const TimesheetsTableProvider = ({ children }: PropsWithChildren) => {
  const state = useTimesheetsTableState();

  return (
    <TimesheetsTableCtx.Provider value={state}>
      {children}
    </TimesheetsTableCtx.Provider>
  );
};

export const useTimesheetsTable = () => {
  if (TimesheetsTableCtx === null) {
    throw new Error(`No provider for TimesheetsTableCtx`);
  }

  return useContext(TimesheetsTableCtx)!;
};
