import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

const QUERY_CLIENT = new QueryClient();

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
    </QueryClientProvider>
  );
}

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
