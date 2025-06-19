import { AppShellHeader, Flex, Text } from "@mantine/core";
import { Navigation } from "./Navigation";

export function AppHeader() {
  return (
    <AppShellHeader>
      <Flex align="center" px="md" justify="space-between" h={48}>
        <Flex>
          <Text c="rgba(255,255,255,0.67)">Time</Text>
          <Text
            variant="gradient"
            fw={500}
            gradient={{ from: "cyan", to: "indigo" }}
          >
            Keeper
          </Text>
        </Flex>
        <Navigation />
      </Flex>
    </AppShellHeader>
  );
}
