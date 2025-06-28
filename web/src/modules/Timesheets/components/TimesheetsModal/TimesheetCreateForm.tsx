import { useCreateTimesheet } from "#timesheets/hooks/useCreateTimesheet";
import { Flex, TextInput } from "@mantine/core";
import { TimesheetFormFooter } from "./TimesheetFormFooter";
import { TbDeviceFloppy } from "react-icons/tb";

export interface TimesheetCreateFormProps {
  dismiss: () => void;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export function TimesheetCreateForm({
  dismiss,
  onSuccess,
  onError,
}: TimesheetCreateFormProps) {
  const { form, submitMutation } = useCreateTimesheet({
    onSuccess: () => {
      dismiss();
      onSuccess();
    },
    onError(error) {
      onError(error);
    },
  });
  const onSubmit = form.onSubmit((values) => {
    submitMutation.mutate({
      ...values,
      lines: [],
    });
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <Flex direction="column">
          <TextInput
            type="date"
            {...form.getInputProps("date")}
            label="Date"
            required
          />
          <TextInput {...form.getInputProps("name")} label="Name" required />
        </Flex>

        <TimesheetFormFooter
          isBusy={submitMutation.isPending}
          disabled={!form.isValid()}
          onCancel={dismiss}
          icon={() => <TbDeviceFloppy />}
        />
      </form>
    </>
  );
}
