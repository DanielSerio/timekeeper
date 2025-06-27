import { Modal } from "@mantine/core";
import { CategoryForm } from "../CategoryModal/CategoryForm";
import { useCategoriesTable } from "#categories/hooks/useCategoriesTable";
import { notifications } from "@mantine/notifications";

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
        onSuccess={(type: "update" | "create") => {
          setIsEditMode(false);
          pagingMethods.goToFirst();

          notifications.show({
            color: "green",
            title: "Success",
            message: `Succesfully ${type}d category`,
          });
        }}
        onError={(error) => {
          notifications.show({
            color: "red",
            title: "Error",
            message: error.message,
          });
        }}
        dismiss={() => modalMethods.dismiss()}
      />
    </Modal>
  );
}
