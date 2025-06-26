import { useCategories } from "./useCategories";
import { useCategoryListModal } from "./useCategoryListModal";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { useTable } from "#core/hooks/useTable";
import { CATEGORY_COLUMNS } from "#categories/const";

export function useCategoriesTable() {
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
  };
  const methods = {
    onChangeSelectionStateForAll,
    onCreateClick,
    onActionClick,
    setIsEditMode,
    setRowSelection,
    modalMethods,
  };

  return [state, methods] as const;
}
