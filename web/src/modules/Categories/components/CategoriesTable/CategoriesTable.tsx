import { Table } from "#core/components/Table/Table";
import { CategoriesTableProvider } from "#categories/hooks/useCategoriesTable";
import { CategoriesTableHead } from "./CategoriesTableHead";
import { CategoriesTableBody } from "./CategoriesTableBody";
import { CategoriesTableModal } from "./CategoriesTableModal";
import { CategoriesTableToolbar } from "./CategoriesTableToolbar";

export function CategoriesTable() {
  return (
    <CategoriesTableProvider>
      <CategoriesTableToolbar />

      <Table name="category">
        <CategoriesTableHead />
        <CategoriesTableBody />
      </Table>

      <CategoriesTableModal />
    </CategoriesTableProvider>
  );
}
