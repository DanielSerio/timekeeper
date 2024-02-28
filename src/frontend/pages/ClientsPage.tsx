import { useCallback, useState } from "react";
import { SidebarNav } from "../component/nav/SidebarNav";
import { Shell } from "../component/shell/Shell";
import { ShellContent } from "../component/shell/ShellContent";
import { ShellFooter } from "../component/shell/ShellFooter";
import { ShellHeader } from "../component/shell/ShellHeader";
import { ShellSidebar } from "../component/shell/ShellSidebar";
import { ConfirmModal } from "../component/modals/ConfirmModal";
import { useControls, type FormValues } from "../hooks/use-controls";
import { useValidation } from "../hooks/use-validation";

export interface ClientsPageProps {
  query?: {
    modal?: string;
  };
}

function useDisclosure() {
  const [isOpened, setIsOpened] = useState(false);

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  const methods = { open, close };
  return [isOpened, methods] as [
    boolean,
    { open: () => void; close: () => void }
  ];
}

export const ClientsPage = (props: ClientsPageProps) => {
  const [selectedClientID, setSelectedClientID] = useState<null | number>(null);
  const [inputValues, setInputValues] = useState({
    checked: false,
    value: "",
  });

  const controlValues: FormValues = {
    checked: {
      componentName: "checkbox",
      componentProps: {
        checked: true,
      },
    },
    value: {
      componentName: "input",
      componentProps: {
        type: "text",
      },
    },
  };
  const { validation, validateField } = useValidation(controlValues, {
    value: (v) =>
      `${v}`.length < 3 ? `Value must be at least 3 characters` : null,
  });
  const controls = useControls(controlValues, validateField);

  const [isOpen, { open, close }] = useDisclosure();

  return (
    <Shell>
      <ShellHeader>Clients</ShellHeader>
      <ShellSidebar>
        <SidebarNav />
      </ShellSidebar>
      <button onClick={() => open()}>open</button>
      <ConfirmModal
        onAccept={() => {
          console.log(JSON.stringify(controls.json));
          setTimeout(() => {
            close();
          }, 1000);
        }}
        onDecline={close}
        isOpen={isOpen}
      >
        {JSON.stringify(controls.values)}
        {JSON.stringify(validation)}
        {controls.controls}
      </ConfirmModal>
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

