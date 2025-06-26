import { Box, Group, Text } from "@mantine/core";
import type { IconType } from "react-icons/lib";

export interface TableMessageProps {
  gridTemplateColumns: string;
  tone?: "default" | "danger";
  message: string;
  icon?: IconType;
}

export function TableMessage({
  gridTemplateColumns,
  tone,
  icon: Icon,
  message,
}: TableMessageProps) {
  const span = gridTemplateColumns.split(/\s+/g).length;

  return (
    <Box
      className={`table-message ${tone ?? "default"}-tone`}
      style={{ gridRow: "span 3", gridColumn: `span ${span}` }}
    >
      <Group>
        {!!Icon && <Icon />}
        <Text>{message}</Text>
      </Group>
    </Box>
  );
}
