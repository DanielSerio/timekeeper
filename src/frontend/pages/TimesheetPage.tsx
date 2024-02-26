import type { Client } from "../../data/entity/client";
import { DashboardClientList } from "../component/list/DashboardClientList";
import { SidebarNav } from "../component/nav/SidebarNav";
import { SidebarNavItem } from "../component/nav/SidebarNavItem";
import { Shell } from "../component/shell/Shell";
import { ShellContent } from "../component/shell/ShellContent";
import { ShellFooter } from "../component/shell/ShellFooter";
import { ShellHeader } from "../component/shell/ShellHeader";
import { ShellSidebar } from "../component/shell/ShellSidebar";
import { Icon } from "../component/ui/Icon";

export interface TimesheetPageProps {
  datestring?: string;
  clients?: Client[];
}

export const TimesheetPage = (props: TimesheetPageProps) => {
  return (
    <Shell>
      <ShellHeader>Timesheet</ShellHeader>
      <ShellSidebar>
        <SidebarNav />
      </ShellSidebar>
      <ShellContent>
        <section>
          <DashboardClientList clients={props.clients} />
        </section>
      </ShellContent>
      <ShellFooter>Footer</ShellFooter>
    </Shell>
  );
};

