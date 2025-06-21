import { classNames } from "#core/utilities/attribute";
import { Box } from "@mantine/core";
import type { AreaHTMLAttributes } from "react";

export interface TableSectionProps extends AreaHTMLAttributes<HTMLDivElement> {
  component: "head" | "body";
  gridTemplateColumns?: string;
}

export function TableSection({
  component,
  children,
  className,
  style,
  gridTemplateColumns,
  ...props
}: TableSectionProps) {
  return (
    <Box
      style={{
        ...(style ?? {}),
        gridTemplateColumns,
      }}
      className={classNames("table-section", `${component}`, className)}
      {...props}
    >
      {children}
    </Box>
  );
}
