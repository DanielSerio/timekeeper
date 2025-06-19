import { AppHeader } from "#core/components/AppHeader";
import { AppShell } from "@mantine/core";

import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppShell header={{ height: 48 }}>
      <AppHeader />
      <Outlet />
    </AppShell>
  );
}
