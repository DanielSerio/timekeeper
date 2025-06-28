import { z } from "zod";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TimesheetService } from "#timesheets/services/timesheet.service";
import type { TimesheetLineCreate } from "#core/types/models/timesheet-line.model-types";

const IDType = z.number().int().positive();
const getTimeType = (name: "startTime" | "endTime") => {
  const titles = {
    startTime: "Start Time",
    endTime: "End Time",
  };

  const title = titles[name];

  return z
    .string()
    .length(5)
    .superRefine((timeString, ctx) => {
      if (!/\d{2}[:]\d{2}/g.test(timeString)) {
        ctx.addIssue({
          code: "custom",
          message: `${title} must be in format (hh:mm)`,
          path: [name],
        });
      }
    });
};

export const CreateTimesheetLineValidator = z.object({
  id: z.null().optional(),
  timesheetId: IDType,
  categoryId: IDType,
  startTime: getTimeType("startTime"),
  endTime: getTimeType("endTime"),
  note: z.string().trim().max(255),
} satisfies Record<keyof TimesheetLineCreate, any>);

export const CreateTimesheetValidator = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(64, "Name is too long (max 64)"),
  date: z.string().date(),
  lines: z.array(CreateTimesheetLineValidator).optional(),
});

interface MutationOn {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

function useCreateFormValidator() {
  const date = new Date();
  const defaultDate = date.toISOString().split("T")[0];

  return useForm({
    initialValues: {
      name: `Timesheet ${date.toLocaleDateString()}`,
      date: defaultDate,
    },
    validate: zodResolver(CreateTimesheetValidator),
  });
}

function useCreateMutation({ onSuccess, onError }: MutationOn) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["timesheets", "create"],
    async mutationFn(formData: z.infer<typeof CreateTimesheetValidator>) {
      const data = await TimesheetService.createTimesheet({
        ...formData,
        date: new Date(Date.parse(`${formData.date} 00:00:00.000`)),
        lines: formData.lines ?? [],
      });

      await queryClient.invalidateQueries({
        queryKey: ["timesheets", "list"],
      });

      return data;
    },
    onSuccess,
    onError: (error) => {
      onError(error);
    },
  });
}

export function useCreateTimesheet(mutationOn: MutationOn) {
  return {
    form: useCreateFormValidator(),
    submitMutation: useCreateMutation(mutationOn),
  };
}
