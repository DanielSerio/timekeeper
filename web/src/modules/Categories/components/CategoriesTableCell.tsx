import { classNames } from "#core/utilities/attribute";
import { Box, type BoxProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

export interface CategoriesTableCellProps
  extends BoxProps,
    PropsWithChildren<{}> {
  className?: string;
  name: string;
}

export function CategoriesTableCell({
  className,
  children,
  name,
  ...props
}: CategoriesTableCellProps) {
  return (
    <Box className={classNames("table-cell", className)} {...props}>
      <Box className="label">{name}</Box>
      <Box className="value">{children}</Box>
    </Box>
  );
}
