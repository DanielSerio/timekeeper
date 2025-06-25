import { Card, Text, type CardProps } from "@mantine/core";
import type { ReactNode } from "react";

export interface BreakdownCardProps extends CardProps {
  title: string | string[];
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
    <Card {...props} component="section" withBorder>
      <Card.Section withBorder p="xs">
        {typeof title === "string" ? (
          <Text component="h1">{title}</Text>
        ) : (
          <>
            {title.map((text, i) => (
              <Text component={`h${i + 1}` as "h1"} key={text}>
                {text}
              </Text>
            ))}
          </>
        )}
      </Card.Section>
      {!!children && (
        <Card.Section withBorder={hasActions} p="xs" flex={1}>
          {children}
        </Card.Section>
      )}
      {hasActions && <Card.Section p="xs">{renderActions()}</Card.Section>}
    </Card>
  );
}
