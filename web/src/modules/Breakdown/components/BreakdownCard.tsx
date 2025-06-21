import { Card, Text, type CardProps } from "@mantine/core";
import type { ReactNode } from "react";

export interface BreakdownCardProps extends CardProps {
  title: string;
  renderActions: () => ReactNode;
}

export function BreakdownCard({
  title,
  children,
  renderActions,
  ...props
}: BreakdownCardProps) {
  const hasActions = typeof renderActions === "function";

  return (
    <Card {...props} withBorder>
      <Card.Section withBorder p="xs">
        <Text size="xl" component="h1">
          {title}
        </Text>
      </Card.Section>
      {!!children && (
        <Card.Section withBorder={hasActions} p="xs">
          {children}
        </Card.Section>
      )}
      {hasActions && <Card.Section p="xs">{renderActions()}</Card.Section>}
    </Card>
  );
}
