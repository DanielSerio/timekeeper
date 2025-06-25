import { z } from "zod";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationKey: ["category", "create"],
    async mutationFn(formData: z.infer<typeof CreateCategoryValidator>) {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      return await response.json();
    },
  });
}

export function useCreateCategory() {
  return {
    form: useCreateFormValidator(),
    submitMutation: useCreateMutation(),
  };
}
