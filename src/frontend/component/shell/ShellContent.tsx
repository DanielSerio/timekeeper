import type { PropsWithChildren } from "react";

export const ShellContent = (props: PropsWithChildren<{}>) => {
  return <main id="content">{props.children}</main>;
};

