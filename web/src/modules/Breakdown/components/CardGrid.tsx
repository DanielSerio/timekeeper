import { Box } from "@mantine/core";
import { type PropsWithChildren } from "react";

export function CardGrid({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  return <Box className={`card-grid ${name}`}>{children}</Box>;
}
