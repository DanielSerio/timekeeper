import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
  type VisibilityState,
} from "@tanstack/react-table";
import type {
  CustomColumnDef,
  UseTableProps,
} from "#core/components/Table/types";
import { useMemo, useState } from "react";

const noData = [] as unknown[];

function getGridTemplateColumns<TData, TValue>(
  columns: CustomColumnDef<TData, TValue>[],
  isEditMode: boolean
) {
  const clone = columns.slice();
  const hasSelect = clone[0].id === "select";

  if (hasSelect && !isEditMode) {
    clone.splice(0, 1);
  }

  const total = clone.reduce((sum, col) => sum + col.size, 0);

  return clone
    .map((col) => `${((col.size / total) * 100).toPrecision(3)}%`)
    .join(" ");
}

/**
 * Creates a table with editable mode and selection column based on the provided columns and query.
 * @param  - The `useTable` function takes in an object with two properties:
 * @returns The `useTable` function returns an object with two properties:
 * 1. `editModeController`: A tuple containing a boolean value for the edit mode state.
 * 2. `table`: An object returned from the `useReactTable` hook, which includes the configured table
 * columns, data, row model, and state settings for the table.
 */
export function useTable<TData, TValue>({
  columns,
  query,
}: UseTableProps<TData, TValue>) {
  const [isEditMode, _setIsEditMode] = useState(false);
  const rowSelectionController = useState<RowSelectionState>({});
  const [rowSelection, setRowSelection] = rowSelectionController;
  const selectionColumn: CustomColumnDef<TData, TValue> = {
    id: "select",
    header: "",
    size: 64,
    enableHiding: true,
  };
  const allColumns = useMemo(() => [selectionColumn, ...columns], []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    select: isEditMode,
  });
  const table = useReactTable({
    columns: allColumns,
    data: query.data?.records ?? (noData as TData[]),
    state: {
      rowSelection,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  const setIsEditMode = (value: boolean) => {
    _setIsEditMode(value);

    table.setColumnVisibility({
      select: value,
    });
  };

  const editModeController = [isEditMode, setIsEditMode] as const;

  return {
    gridTemplateColumns: getGridTemplateColumns(allColumns, isEditMode),
    editModeController,
    rowSelectionController,
    table,
  };
}
