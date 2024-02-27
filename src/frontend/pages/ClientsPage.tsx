import { createRef, useLayoutEffect, useState, type RefObject } from "react";
import { SidebarNav } from "../component/nav/SidebarNav";
import { Shell } from "../component/shell/Shell";
import { ShellContent } from "../component/shell/ShellContent";
import { ShellFooter } from "../component/shell/ShellFooter";
import { ShellHeader } from "../component/shell/ShellHeader";
import { ShellSidebar } from "../component/shell/ShellSidebar";
import { useAlertModal } from "../hooks/use-modal";

export interface ClientsPageProps {
  query?: {
    modal?: string;
  };
}

export const ClientsPage = (props: ClientsPageProps) => {
  const [selectedClientID, setSelectedClientID] = useState<null | number>(null);
  const { Modal, openModal } = useAlertModal({
    onClose: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          alert();
          resolve(null);
        }, 4000);
      });
    },
  });
  return (
    <Shell>
      <ShellHeader>Clients</ShellHeader>
      <ShellSidebar>
        <SidebarNav />
      </ShellSidebar>
      <button onClick={() => openModal()}>modal</button>
      <Modal>
        <p>Home</p>
      </Modal>
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

