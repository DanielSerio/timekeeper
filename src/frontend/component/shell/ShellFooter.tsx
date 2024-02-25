import type { PropsWithChildren } from "react";

export const ShellFooter = (props: PropsWithChildren<{}>) => {
  return <footer id="footer">{props.children}</footer>;
};

