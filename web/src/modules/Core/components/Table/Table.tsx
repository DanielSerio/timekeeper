import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableHead } from "./TableHead";
import { TableToolbar } from "./TableToolbar";
import { classNames } from "#core/utilities/attribute";
import type { PropsWithChildren } from "react";
import { TableRow } from "./TableRow";
import { TableSkeletonRow } from "./TableSkeletonRow";
import { TableMessage } from "./TableMessage";

const TableComponent = ({
  name,
  children,
}: PropsWithChildren<{ name: string }>) => {
  return (
    <div className="table-wrapper">
      <div className={classNames("table", name)}>{children}</div>
    </div>
  );
};

TableComponent.TableHead = TableHead;
TableComponent.TableBody = TableBody;
TableComponent.TableRow = TableRow;
TableComponent.Toolbar = TableToolbar;
TableComponent.Footer = TableFooter;
TableComponent.SkeletonRow = TableSkeletonRow;
TableComponent.Message = TableMessage;

export const Table = TableComponent;
