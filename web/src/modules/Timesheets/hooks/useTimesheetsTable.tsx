import { useNavigate } from "@tanstack/react-router";
import { useTimesheets } from "./useTimesheets";
import { useTimesheetListModal } from "./useTimesheetListModal";
import { useTable } from "#core/hooks/useTable";
import { TIMESHEET_COLUMNS } from "#timesheets/const";
import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import type { Row } from "@tanstack/react-table";
import { useMutation } from "@tanstack/react-query";

function useDeleteMutation(
  rowSelection: Record<number, boolean>,
  rows: Row<TimesheetRecord>[]
) {
  const ids = Object.entries(rowSelection)
    .filter(([_, selected]) => selected)
    .map(
      ([rowIndex]) => rows.find((row) => row.index === +rowIndex)?.id ?? null
    )
    .filter((rowId) => rowId !== null);
  return useMutation({
    mutationKey: ["delete", "timesheets", `ids=${ids.toString()}`],
    async mutationFn() {
      alert(ids);
    },
  });
}

export function useTimesheetsTable() {
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

  const deleteMutation = useDeleteMutation(rowSelection, rowModel.rows);

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
