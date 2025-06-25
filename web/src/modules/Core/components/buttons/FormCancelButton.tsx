import { Button, Group, Text } from "@mantine/core";
import type { BaseButtonProps } from "./types";
import { TbCancel } from "react-icons/tb";

export function FormCancelButton({
  isBusy,
  disabled,
  children,
  color,
  ...props
}: BaseButtonProps) {
  const isDisabled = isBusy || disabled;

  return (
    <Button
      color={color ?? "gray"}
      disabled={isDisabled}
      pl="sm"
      pr="xs"
      {...props}
    >
      <Group gap={6}>
        {!!children ? children : <Text>Cancel</Text>}
        <TbCancel />
      </Group>
    </Button>
  );
}
