import { Group } from "@mantine/core";
import { FormCancelButton } from "#core/components/buttons";
import { FormSubmitButton } from "#core/components/buttons/FormSubmitButton";

export interface TimesheetFormFooterProps {
  isBusy?: boolean;
  disabled?: boolean;
  icon?: () => React.ReactNode;
  onCancel: () => void;
}

export function TimesheetFormFooter({
  isBusy,
  disabled,
  icon,
  onCancel,
}: TimesheetFormFooterProps) {
  return (
    <Group justify="flex-end" mt="lg">
      <FormCancelButton color="gray" disabled={isBusy} onClick={onCancel} />
      <FormSubmitButton isBusy={isBusy} disabled={disabled} icon={icon} />
    </Group>
  );
}
