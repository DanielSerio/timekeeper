import { useMemo } from "react";
import { Icon } from "../ui/Icon";

export interface SidebarNavItemProps {
  href: string;
  title: string;
  icon: string;
}

export const SidebarNavItem = (props: SidebarNavItemProps) => {
  const isActive = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      typeof window !== "undefined" &&
      window.location.href.startsWith(`http://localhost:4321${props.href}`)
    );
  }, [props.href]);
  return (
    <a
      href={`${props.href}`}
      title={props.title}
      className={isActive ? "sidebar-nav-item active" : "sidebar-nav-item"}
    >
      <Icon size={24} name={props.icon} />
    </a>
  );
};

