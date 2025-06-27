import { z } from "zod";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { useMutation } from "@tanstack/react-query";
import { CategoriesService } from "#categories/services/categories.service";

export const UpdateCategoryValidator = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(64, "Name is too long (max 64)"),
});

function useUpdateFormValidator(category: CategoryRecord) {
  return useForm({
    initialValues: {
      name: category.name,
    },
    validate: zodResolver(UpdateCategoryValidator),
  });
}

function useUpdateMutation(categoryId: Pick<CategoryRecord, "id">["id"]) {
  return useMutation({
    mutationKey: ["category", "update", categoryId],
    async mutationFn(formData: z.infer<typeof UpdateCategoryValidator>) {
      const data = await CategoriesService.updateCategory(categoryId, formData);

      return data;
    },
  });
}

export function useUpdateCategory(category: CategoryRecord) {
  return {
    form: useUpdateFormValidator(category),
    submitMutation: useUpdateMutation(category.id),
  };
}
