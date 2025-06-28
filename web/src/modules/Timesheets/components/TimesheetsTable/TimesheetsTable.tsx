import { Table } from "#core/components/Table/Table";
import { TimesheetsTableProvider } from "#timesheets/hooks/useTimesheetsTable";
import { TimesheetsTableBody } from "./TimesheetsTableBody";
import { TimesheetsTableHead } from "./TimesheetsTableHead";
import { TimesheetsTableToolbar } from "./TimesheetsTableToolbar";
import { TimesheetsTableModal } from "../TimesheetsModal/TimesheetsTableModal";

export function TimesheetsTable() {
  return (
    <TimesheetsTableProvider>
      <TimesheetsTableToolbar />

      <Table name="timesheets">
        <TimesheetsTableHead />
        <TimesheetsTableBody />
      </Table>

      <TimesheetsTableModal />
    </TimesheetsTableProvider>
  );
}
