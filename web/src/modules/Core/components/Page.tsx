import { AppShellMain, type AppShellMainProps } from "@mantine/core";
import { classNames } from "#core/utilities/attribute";

export interface PageProps extends AppShellMainProps {}

export function Page({ children, className, ...props }: PageProps) {
  const classes = classNames("page", className);

  return (
    <AppShellMain className={classes} {...props}>
      {children}
    </AppShellMain>
  );
}
