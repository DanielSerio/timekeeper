import { Flex, TextInput } from "@mantine/core";
import { TbDeviceFloppy } from "react-icons/tb";
import { useCreateCategory } from "#categories/hooks/useCreateCategory";
import { useUpdateCategory } from "#categories/hooks/useUpdateCategory";
import { CategoryFormFooter } from "./CategoryFormFooter";
import type {
  CategoryFormProps,
  CreateCategoryFormProps,
  UpdateCategoryFormProps,
} from "./types";

function CreateCategoryForm({
  onSuccess,
  onError,
  dismiss,
}: CreateCategoryFormProps) {
  const { form, submitMutation } = useCreateCategory();

  const onSubmit = form.onSubmit((values) => {
    submitMutation.mutate(values, {
      onSuccess: () => {
        dismiss();
        onSuccess("create");
      },
      onError(error) {
        onError(error);
      },
    });
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Flex direction="column">
          <TextInput {...form.getInputProps("name")} label="Name" required />
        </Flex>

        <CategoryFormFooter
          isBusy={submitMutation.isPending}
          disabled={!form.isValid()}
          onCancel={dismiss}
          icon={() => <TbDeviceFloppy />}
        />
      </form>
    </>
  );
}

function UpdateCategoryForm({
  category,
  onSuccess,
  onError,
  dismiss,
}: UpdateCategoryFormProps) {
  const { form, submitMutation } = useUpdateCategory(category);

  const onSubmit = form.onSubmit((values) => {
    submitMutation.mutate(values, {
      onSuccess: () => {
        dismiss();
        onSuccess("update");
      },
      onError(error) {
        onError(error);
      },
    });
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Flex direction="column">
          <TextInput {...form.getInputProps("name")} label="Name" required />
        </Flex>

        <CategoryFormFooter
          isBusy={submitMutation.isPending}
          disabled={!form.isValid()}
          onCancel={dismiss}
          icon={() => <TbDeviceFloppy />}
        />
      </form>
    </>
  );
}

export function CategoryForm({
  category,
  onSuccess,
  onError,
  dismiss,
}: CategoryFormProps) {
  if (category) {
    return (
      <UpdateCategoryForm
        category={category}
        dismiss={dismiss}
        onSuccess={onSuccess}
        onError={onError}
      />
    );
  }

  return (
    <CreateCategoryForm
      dismiss={dismiss}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
}
