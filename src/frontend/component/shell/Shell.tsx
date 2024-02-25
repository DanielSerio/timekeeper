import type { PropsWithChildren } from "react";

export const Shell = (props: PropsWithChildren<{}>) => {
  return (
    <div id="shell" className="app-shell">
      {props.children}
    </div>
  );
};
