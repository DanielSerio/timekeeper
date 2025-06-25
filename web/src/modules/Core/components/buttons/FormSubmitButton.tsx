import { Button, Group, Loader, Text } from "@mantine/core";
import type { ButtonIconProps, SubmitButtonProps } from "./types";

function ButtonIcon({ isBusy, icon: Icon }: ButtonIconProps) {
  if (isBusy) {
    return <Loader size="xs" color="gray" />;
  }

  if (!Icon) {
    return <></>;
  }

  return <Icon />;
}

export function FormSubmitButton({
  isBusy,
  disabled,
  children,
  icon,
  color,
  ...props
}: SubmitButtonProps) {
  const isDisabled = isBusy || disabled;

  return (
    <Button type="submit" disabled={isDisabled} pl="sm" pr="xs" {...props}>
      <Group gap={6}>
        {!!children ? children : <Text>Save</Text>}
        <ButtonIcon isBusy={isBusy} icon={icon} />
      </Group>
    </Button>
  );
}
