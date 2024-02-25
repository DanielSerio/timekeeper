import type { PropsWithChildren } from "react";
import type { ShellSidebarProps } from "./props";

export const ShellSidebar = (props: PropsWithChildren<ShellSidebarProps>) => {
  return (
    <aside id="sidebar" className={props.side || "left"}>
      <div className="sidebar-inner inner-elevated">{props.children}</div>
    </aside>
  );
};

