import {
  forwardRef,
  type ForwardedRef,
  type PropsWithChildren,
  type RefObject,
  useMemo,
} from "react";
import { Icon, type IconProps } from "../component/ui/Icon";

export type ModalTypeName = "alert" | "confirm" | "form";

export interface ModalButton {
  style?: "cancel" | "danger" | "warning" | "success" | "primary";
  text: string;
  icon?: IconProps;
  onClick?: () => void;
}

interface UseModalParamsBase<Type extends ModalTypeName> {
  id: string;
  type: Type;
  ref: RefObject<HTMLDialogElement>;
  button?: ModalButton;
  confirm?: ModalButton;
  cancel?: ModalButton;
  buttons?: ModalButton[];
}

export interface UseAlertModalParams<Type extends "alert" = "alert">
  extends UseModalParamsBase<Type> {
  id: string;
  type: Type;
  ref: RefObject<HTMLDialogElement>;
  button?: ModalButton;
  confirm?: never;
  cancel?: never;
  buttons?: never;
}

export interface UseConfirmModalParams<Type extends "confirm" = "confirm">
  extends UseModalParamsBase<Type> {
  id: string;
  type: Type;
  ref: RefObject<HTMLDialogElement>;
  button?: never;
  confirm?: ModalButton;
  cancel?: ModalButton;
  buttons?: never;
}

export interface UseFormModalParams<Type extends "form" = "form">
  extends UseModalParamsBase<Type> {
  id: string;
  type: Type;
  ref: RefObject<HTMLDialogElement>;
  button?: never;
  confirm?: never;
  cancel?: never;
  buttons: ModalButton[];
}

export type UseModalParams<Type extends ModalTypeName> = Type extends "form"
  ? UseFormModalParams
  : Type extends "confirm"
  ? UseConfirmModalParams
  : UseAlertModalParams;

const defaultAlertButton: ModalButton = {
  text: "OK",
  style: "primary",
  icon: { name: "checkmark" },
};

const defaultConfirmButton: ModalButton = {
  text: "Yes",
  style: "primary",
  icon: { name: "checkmark" },
};

const defaultCancelButton: ModalButton = {
  text: "Cancel",
  style: "cancel",
  icon: { name: "xmark" },
};

export function useModal<Type extends ModalTypeName>(
  params: UseModalParams<Type>
) {
  const openModal = () => {
    const current = params.ref.current;
    if (current) {
      current.showModal();
    }
  };

  const closeModal = () => {
    const current = params.ref.current;
    if (current) {
      current.close();
    }
  };

  const Modal = forwardRef(
    (
      props: PropsWithChildren<{ title: string }>,
      ref: ForwardedRef<HTMLDialogElement>
    ) => {
      const Buttons = () => {
        const buttonConfig = useMemo(() => {
          if (params.type === "alert") {
            return [
              {
                style: params.button?.style || defaultAlertButton.style,
                text: params.button?.text || defaultAlertButton.text,
                icon: params.button?.icon || defaultAlertButton.icon,
                onClick: params.button?.onClick || defaultAlertButton.onClick,
              },
            ];
          } else if (params.type === "confirm") {
            return [
              {
                style: params.cancel?.style || defaultCancelButton.style,
                text: params.cancel?.text || defaultCancelButton.text,
                icon: params.cancel?.icon || defaultCancelButton.icon,
                onClick: params.cancel?.onClick || defaultCancelButton.onClick,
              },
              {
                style: params.confirm?.style || defaultConfirmButton.style,
                text: params.confirm?.text || defaultConfirmButton.text,
                icon: params.confirm?.icon || defaultConfirmButton.icon,
                onClick:
                  params.confirm?.onClick || defaultConfirmButton.onClick,
              },
            ];
          } else {
            return params.buttons;
          }
        }, [
          params,
          defaultCancelButton,
          defaultAlertButton,
          defaultConfirmButton,
        ]);
        return (
          <>
            {buttonConfig &&
              buttonConfig.length > 0 &&
              buttonConfig.map((cfg, i) => {
                return (
                  <button
                    key={i}
                    className={cfg.style}
                    data-cfg={JSON.stringify(cfg)}
                    onClick={cfg.onClick}
                  >
                    <span className="text">{cfg.text}</span>
                    {cfg.icon !== undefined && <Icon name={cfg.icon!.name} />}
                  </button>
                );
              })}
          </>
        );
      };

      return (
        <dialog
          id={params.id}
          className={`modal-root ${params.type}`}
          ref={ref}
        >
          <div className="backdrop" onClick={() => closeModal()}></div>
          <div className="modal-content">
            <div className="card">
              <header>
                <em>{props.title}</em>
                <button onClick={() => closeModal()}>x</button>
              </header>
              <div className="body">{props.children}</div>
              <footer>
                <Buttons />
              </footer>
            </div>
          </div>
        </dialog>
      );
    }
  );

  return {
    Modal,
    openModal,
    closeModal,
  };
}

