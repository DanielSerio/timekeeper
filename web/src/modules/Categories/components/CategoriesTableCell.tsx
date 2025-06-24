import { classNames } from "#core/utilities/attribute";
import { Box, type BoxProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

export interface CategoriesTableCellProps
  extends BoxProps,
    PropsWithChildren<{}> {
  className?: string;
  name: string;
  align?: "left" | "center" | "right" | null;
}

export function CategoriesTableCell({
  className,
  children,
  align,
  name,
  ...props
}: CategoriesTableCellProps) {
  return (
    <Box
      className={classNames(
        "table-cell",
        align ? `align-${align}` : null,
        className
      )}
      {...props}
    >
      <Box className="label">{name}</Box>
      <Box className="value">{children}</Box>
    </Box>
  );
}
