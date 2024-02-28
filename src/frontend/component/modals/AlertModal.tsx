import type { PropsWithChildren } from "react";

export const AlertModal = (
  props: PropsWithChildren<{
    isOpen: boolean;
    onAccept: (() => void) | (() => Promise<void>);
  }>
) => {
  return (
    <dialog className="modal-root" open={props.isOpen}>
      <div className="backdrop"></div>
      <div className="modal-content">
        <div className="card">
          <header>Title</header>
          <div className="body">{props.children}</div>
          <footer>
            <button onClick={props.onAccept}>OK</button>
          </footer>
        </div>
      </div>
    </dialog>
  );
};

