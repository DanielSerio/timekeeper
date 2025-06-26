import { useCategories } from "./useCategories";
import { useCategoryListModal } from "./useCategoryListModal";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { useTable } from "#core/hooks/useTable";
import { CATEGORY_COLUMNS } from "#categories/const";
import { useMutation } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";

function useDeleteMutation(
  rowSelection: Record<number, boolean>,
  rows: Row<CategoryRecord>[]
) {
  const ids = Object.entries(rowSelection)
    .filter(([_, selected]) => selected)
    .map(
      ([rowIndex]) => rows.find((row) => row.index === +rowIndex)?.id ?? null
    )
    .filter((rowId) => rowId !== null);
  return useMutation({
    mutationKey: ["delete", "categories", `ids=${ids.toString()}`],
    async mutationFn() {
      alert(ids);
    },
  });
}

export function useCategoriesTable() {
  const {
    query: categoriesQuery,
    pagingController: [paging],
    count: totalRecords,
  } = useCategories();
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
  const onActionClick = (category: CategoryRecord) =>
    modalMethods.open({
      category,
    });
  const onDeleteClick = () => deleteMutation.mutateAsync();

  const state = {
    isEditMode,
    allRowsSelected: allSelected,
    noRowsSelected: noneSelected,
    modalState,
    rowCount: count,
    gridTemplateColumns,
    table,
    categoriesQuery,
    rowSelection,
    paging,
    totalRecords,
  };
  const methods = {
    onChangeSelectionStateForAll,
    onCreateClick,
    onActionClick,
    onDeleteClick,
    setIsEditMode,
    setRowSelection,
    modalMethods,
  };

  return [state, methods] as const;
}
