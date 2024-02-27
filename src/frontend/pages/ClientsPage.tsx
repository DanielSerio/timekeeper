import { createRef, useLayoutEffect, useState, type RefObject } from "react";
import { SidebarNav } from "../component/nav/SidebarNav";
import { Shell } from "../component/shell/Shell";
import { ShellContent } from "../component/shell/ShellContent";
import { ShellFooter } from "../component/shell/ShellFooter";
import { ShellHeader } from "../component/shell/ShellHeader";
import { ShellSidebar } from "../component/shell/ShellSidebar";

export interface ClientsPageProps {
  query?: {
    modal?: string;
  };
}

export const ClientsPage = (props: ClientsPageProps) => {
  const [selectedClientID, setSelectedClientID] = useState<null | number>(null);

  return (
    <Shell>
      <ShellHeader>Clients</ShellHeader>
      <ShellSidebar>
        <SidebarNav />
      </ShellSidebar>
      <ShellContent>
        <section>
          <article>
            <h1>Clients Page Content</h1>
          </article>
          <article>
            <pre>{JSON.stringify(props.query)}</pre>
          </article>
        </section>
      </ShellContent>
      <ShellFooter>Footer</ShellFooter>
    </Shell>
  );
};

