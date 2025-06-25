import { FormCancelButton } from "#core/components/buttons";
import { FormSubmitButton } from "#core/components/buttons/FormSubmitButton";
import { Group } from "@mantine/core";
import React from "react";

export interface CategoryFormFooterProps {
  isBusy?: boolean;
  disabled?: boolean;
  icon?: () => React.ReactNode;
  onCancel: () => void;
}

export function CategoryFormFooter({
  icon,
  isBusy,
  disabled = false,
  onCancel,
}: CategoryFormFooterProps) {
  return (
    <Group justify="flex-end" mt="lg">
      <FormCancelButton color="gray" disabled={isBusy} onClick={onCancel} />
      <FormSubmitButton isBusy={isBusy} disabled={disabled} icon={icon} />
    </Group>
  );
}
