import type { PropsWithChildren } from "react";
import { Button } from "../buttons/Button";

export const ConfirmModal = (
  props: PropsWithChildren<{
    isOpen: boolean;
    onAccept: (() => void) | (() => Promise<void>);
    onDecline: (() => void) | (() => Promise<void>);
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
            <Button
              type="button"
              className="cancel"
              text="Cancel"
              onClick={props.onDecline}
              icon={{ name: "x" }}
            />
            <Button
              type="submit"
              className="submit"
              text="Save"
              onClick={props.onAccept}
              icon={{ name: "checkmark" }}
            />
          </footer>
        </div>
      </div>
    </dialog>
  );
};

