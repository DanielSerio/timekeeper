import { Button, Group, Loader } from "@mantine/core";
import type { ReactNode } from "react";

interface CancellableSaveSubButtonProps {
  name: "edit" | "save" | "cancel";
  onClick?: () => void;
  icon?: ReactNode;
  text?: string;
}
interface CancellableSaveButtonEditProps extends CancellableSaveSubButtonProps {
  name: "edit";
}
interface CancellableSaveButtonSaveProps extends CancellableSaveSubButtonProps {
  name: "save";
}
interface CancellableSaveButtonCancelProps
  extends CancellableSaveSubButtonProps {
  name: "cancel";
}

export interface CancellableSaveButtonProps {
  edit: Omit<CancellableSaveButtonEditProps, "name">;
  save: Omit<CancellableSaveButtonSaveProps, "name">;
  cancel: Omit<CancellableSaveButtonCancelProps, "name">;
  isBusy?: boolean;
  disabled?: boolean;
  isEditMode?: boolean;
}

const caps = (name: "edit" | "save" | "cancel") =>
  `${name[0].toUpperCase()}${name.slice(1)}`;

function SubButton({
  name,
  isBusy,
  isDisabled,
  icon,
  text,
  onClick,
}: CancellableSaveSubButtonProps & {
  isDisabled?: boolean;
  isBusy?: boolean;
  isEditMode?: boolean;
}) {
  return (
    <Button
      disabled={isDisabled}
      size="xs"
      color={name === "cancel" ? "gray" : undefined}
      rightSection={isBusy ? <Loader color="gray" size="xs" /> : icon}
      onClick={onClick}
    >
      {text ?? caps(name)}
    </Button>
  );
}

export function CancellableSaveButton({
  isEditMode,
  isBusy,
  disabled,
  edit,
  cancel,
  save,
}: CancellableSaveButtonProps) {
  const isDisabled = isBusy || disabled;

  return (
    <Group>
      {!isEditMode ? (
        <SubButton
          name="edit"
          isBusy={isBusy}
          isDisabled={isDisabled}
          icon={edit.icon}
          onClick={edit.onClick}
        />
      ) : (
        <>
          <SubButton
            name="cancel"
            isBusy={isBusy}
            isDisabled={isDisabled}
            icon={cancel.icon}
            onClick={cancel.onClick}
          />
          <SubButton
            name="save"
            isBusy={isBusy}
            isDisabled={isDisabled}
            icon={save.icon}
            onClick={save.onClick}
          />
        </>
      )}
    </Group>
  );
}
