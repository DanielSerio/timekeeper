import { useTimesheetsTable } from "#timesheets/hooks/useTimesheetsTable";
import { Modal } from "@mantine/core";
import { TimesheetCreateForm } from "./TimesheetCreateForm";
import { useCallback } from "react";
import { notifications } from "@mantine/notifications";

export function TimesheetsTableModal() {
  const [{ modalState }, { modalMethods, setIsEditMode }] =
    useTimesheetsTable();

  const onSuccess = useCallback(() => {
    setIsEditMode(false);
    modalMethods.dismiss();

    notifications.show({
      color: "green",
      title: "Success",
      message: "Successfully created timesheet",
    });
  }, [setIsEditMode]);

  const onError = useCallback(
    (error: Error) => {
      setIsEditMode(false);

      notifications.show({
        color: "red",
        title: "Error",
        message: error.message,
      });
    },
    [setIsEditMode]
  );

  return (
    <Modal
      title="Create Timesheet"
      opened={modalState !== null}
      onClose={() => modalMethods.dismiss()}
    >
      <TimesheetCreateForm
        dismiss={modalMethods.dismiss}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Modal>
  );
}
