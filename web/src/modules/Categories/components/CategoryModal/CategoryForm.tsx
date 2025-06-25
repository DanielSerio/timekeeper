import { useCreateCategory } from "#categories/hooks/useCreateCategory";
import { useUpdateCategory } from "#categories/hooks/useUpdateCategory";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { Flex, TextInput } from "@mantine/core";
import { CategoryFormFooter } from "./CategoryFormFooter";
import { TbDeviceFloppy } from "react-icons/tb";

function CreateCategoryForm({ dismiss }: { dismiss: () => void }) {
  const { form, submitMutation } = useCreateCategory();

  const onSubmit = form.onSubmit((values) => {
    submitMutation.mutate(values, {
      onSuccess: () => {
        dismiss();
      },
      //TODO: handleError
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
  dismiss,
}: {
  category: CategoryRecord;
  dismiss: () => void;
}) {
  const { form, submitMutation } = useUpdateCategory(category);

  const onSubmit = form.onSubmit((values) => {
    submitMutation.mutate(values, {
      onSuccess: () => {
        dismiss();
      },
      //TODO: handleError
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
  dismiss,
}: {
  category?: CategoryRecord;
  dismiss: () => void;
}) {
  if (category) {
    return <UpdateCategoryForm category={category} dismiss={dismiss} />;
  }

  return <CreateCategoryForm dismiss={dismiss} />;
}
