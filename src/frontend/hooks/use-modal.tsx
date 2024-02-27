import {
  forwardRef,
  type ForwardedRef,
  type PropsWithChildren,
  createRef,
  type RefObject,
  useState,
} from "react";

export const ModalElement = forwardRef(
  (
    props: PropsWithChildren<{ onTriggerClose: () => void }>,
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    return (
      <dialog className="modal-root" ref={ref}>
        <div className="backdrop"></div>
        <div className="modal-content">
          <div className="card">
            <header>
              <button onClick={props.onTriggerClose}>x</button>
            </header>
            {props.children}
          </div>
        </div>
      </dialog>
    );
  }
);

export interface UseAlertModalParams {
  onClose: () => Promise<void>;
}

const useModalActions = (
  onClose: () => Promise<void>,
  ref: RefObject<HTMLDialogElement> | null
) => {
  const closeModal = async () => {
    await onClose()
      .then((d) => {
        if (ref?.current) {
          ref.current!.close();
        }
      })
      .catch(console.error);
  };

  const openModal = () => {
    if (ref && ref?.current) {
      ref.current.showModal();
    }
  };

  return {
    openModal,
    closeModal,
    ref,
  };
};

export const useAlertModal = (props: UseAlertModalParams) => {
  let modalRef = createRef<HTMLDialogElement>();
  const { openModal, closeModal } = useModalActions(props.onClose, modalRef);

  const Modal = (props: PropsWithChildren<{}>) => {
    const [performingAction, setPerformingAction] = useState(false);
    const close = async () => {
      setPerformingAction(true);
      await closeModal();
      setPerformingAction(false);
    };

    const Footer = () => (
      <footer>
        <pre>{performingAction && JSON.stringify({ performingAction })}</pre>
        <button disabled={performingAction === true} onClick={close}>
          OK
        </button>
      </footer>
    );

    return (
      <ModalElement ref={modalRef} onTriggerClose={closeModal}>
        <div className="body">{props.children}</div>
        <Footer />
      </ModalElement>
    );
  };

  return {
    Modal,
    openModal,
    closeModal,
  };
};

