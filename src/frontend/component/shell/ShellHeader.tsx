import type { PropsWithChildren } from "react";
import type { ShellHeaderProps } from "./props";

export const ShellHeader = (props: PropsWithChildren<ShellHeaderProps>) => {
  return (
    <header id="header" style={{ position: props.position || "fixed" }}>
      <div className="header-inner inner-elevated">{props.children}</div>
    </header>
  );
};

