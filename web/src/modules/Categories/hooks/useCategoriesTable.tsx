import { useCategories } from "./useCategories";
import { useCategoryListModal } from "./useCategoryListModal";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { useTable } from "#core/hooks/useTable";
import { CATEGORY_COLUMNS } from "#categories/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { createContext, useContext, type PropsWithChildren } from "react";
import { CategoriesService } from "#categories/services/categories.service";
import { notifications } from "@mantine/notifications";

function useDeleteMutation(
  rowSelection: Record<number, boolean>,
  rows: Row<CategoryRecord>[],
  methods: {
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
    mutationKey: ["delete", "categories", `ids=${ids.toString()}`],
    async mutationFn() {
      try {
        const intIds = ids.map((n) => +n);
        const result = await CategoriesService.deleteCategories(intIds);

        await queryClient.invalidateQueries({
          queryKey: ["categories"],
        });

        methods.onSuccess();

        return result;
      } catch (err) {
        const error = err as Error;

        methods.onError(error);
      }
    },
  });
}

function useCategoriesTableState() {
  const {
    query: categoriesQuery,
    pagingController: [paging, pagingMethods],
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

  const deleteMutation = useDeleteMutation(rowSelection, rowModel.rows, {
    onSuccess: () => {
      setIsEditMode(false);
      setRowSelection({});
      categoriesQuery.refetch();

      notifications.show({
        title: "Success",
        message: "Successfully deleted categories",
        color: "green",
      });
    },
    onError: (error) => {
      setRowSelection({});
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
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
    pagingMethods,
  };

  return [state, methods] as const;
}

const CategoriesTableCtx = createContext<null | ReturnType<
  typeof useCategoriesTableState
>>(null);

export const CategoriesTableProvider = ({ children }: PropsWithChildren) => {
  const state = useCategoriesTableState();

  return (
    <CategoriesTableCtx.Provider value={state}>
      {children}
    </CategoriesTableCtx.Provider>
  );
};

export const useCategoriesTable = () => {
  if (CategoriesTableCtx === null) {
    throw new Error(`CategoriesTableCtx cannot be null`);
  }

  return useContext(CategoriesTableCtx)!;
};
