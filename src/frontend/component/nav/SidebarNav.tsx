import { SidebarNavItem } from "./SidebarNavItem";

export const SidebarNav = () => {
  return (
    <nav id="mainNav">
      <SidebarNavItem href={"/timesheet"} icon={"grid"} title={"Timesheet"} />
      <SidebarNavItem href={"/clients"} icon={"people"} title={"Clients"} />
    </nav>
  );
};

