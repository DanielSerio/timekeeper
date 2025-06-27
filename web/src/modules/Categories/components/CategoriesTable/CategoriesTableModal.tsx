import { Modal } from "@mantine/core";
import { CategoryForm } from "../CategoryModal/CategoryForm";
import { useCategoriesTable } from "#categories/hooks/useCategoriesTable";

export function CategoriesTableModal() {
  const [{ modalState }, { modalMethods, pagingMethods, setIsEditMode }] =
    useCategoriesTable();

  return (
    <Modal
      title={modalState?.category ? "Edit Category" : "Create Category"}
      opened={modalState !== null}
      onClose={() => modalMethods.dismiss()}
    >
      <CategoryForm
        category={modalState?.category}
        onSuccess={() => {
          setIsEditMode(false);
          pagingMethods.goToFirst();
          //TODO: Toast
        }}
        onError={() => {
          //TODO: Toast
        }}
        dismiss={() => modalMethods.dismiss()}
      />
    </Modal>
  );
}
