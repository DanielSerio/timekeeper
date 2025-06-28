import { z } from "zod";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoriesService } from "#categories/services/categories.service";

export const CreateCategoryValidator = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(64, "Name is too long (max 64)"),
});

function useCreateFormValidator() {
  return useForm({
    initialValues: {
      name: "",
    },
    validate: zodResolver(CreateCategoryValidator),
  });
}

function useCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["categories", "create"],
    async mutationFn(formData: z.infer<typeof CreateCategoryValidator>) {
      const data = await CategoriesService.createCategory(formData);
      await queryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });

      return data;
    },
  });
}

export function useCreateCategory() {
  return {
    form: useCreateFormValidator(),
    submitMutation: useCreateMutation(),
  };
}
