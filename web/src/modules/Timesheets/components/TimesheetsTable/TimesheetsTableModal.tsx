import { useTimesheetsTable } from "#timesheets/hooks/useTimesheetsTable";
import { Modal } from "@mantine/core";

export function TimesheetsTableModal() {
  const [{ modalState }, { modalMethods }] = useTimesheetsTable();

  return (
    <Modal opened={modalState !== null} onClose={() => modalMethods.dismiss()}>
      <p>Create Modal</p>
    </Modal>
  );
}
