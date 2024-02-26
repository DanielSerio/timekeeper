import { createRef, useLayoutEffect, useState } from "react";
import { SidebarNav } from "../component/nav/SidebarNav";
import { Shell } from "../component/shell/Shell";
import { ShellContent } from "../component/shell/ShellContent";
import { ShellFooter } from "../component/shell/ShellFooter";
import { ShellHeader } from "../component/shell/ShellHeader";
import { ShellSidebar } from "../component/shell/ShellSidebar";
import { useModal } from "../hooks/use-modal";

export interface ClientsPageProps {
  query?: {
    modal?: string;
  };
}

export const ClientsPage = (props: ClientsPageProps) => {
  const [selectedClientID, setSelectedClientID] = useState<null | number>(null);
  let ref = createRef<HTMLDialogElement>();
  const { Modal, openModal, closeModal } = useModal({
    type: "alert",
    id: "testModal",
    ref,
  });

  const {
    Modal: CreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal({
    type: "confirm",
    id: "testCreateModal",
    ref,
  });
  useLayoutEffect(() => {
    if (props.query && props.query.modal) {
      if (props.query.modal === "create-client") {
        openCreateModal();
        setSelectedClientID(null);
      } else {
        const id = props.query.modal.replace(/((\w+)[\-])+/g, "");
        setSelectedClientID(+id);
        alert(`Edit Client: ${id}`);
      }
    }
  }, [props.query, setSelectedClientID]);

  return (
    <Shell>
      <ShellHeader>Clients</ShellHeader>
      <ShellSidebar>
        <SidebarNav />
      </ShellSidebar>
      <Modal title="Test Modal" ref={ref}>
        <p>Some Message</p>
      </Modal>
      <CreateModal title="Create Client" ref={ref}>
        <p>Create Modal</p>
      </CreateModal>
      <ShellContent>
        <section>
          <article>
            <h1>Clients Page Content</h1>
          </article>
          <article>
            <pre>{JSON.stringify(props.query)}</pre>
            <button onClick={() => openModal()}>modal</button>
          </article>
        </section>
      </ShellContent>
      <ShellFooter>Footer</ShellFooter>
    </Shell>
  );
};

