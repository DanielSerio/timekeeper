import { Shell } from "../component/shell/Shell";
import { ShellContent } from "../component/shell/ShellContent";
import { ShellFooter } from "../component/shell/ShellFooter";
import { ShellHeader } from "../component/shell/ShellHeader";
import { ShellSidebar } from "../component/shell/ShellSidebar";

export interface TimesheetPageProps {
  datestring?: string;
}

export const TimesheetPage = (props: TimesheetPageProps) => {
  return (
    <Shell>
      <ShellHeader>Timesheet</ShellHeader>
      <ShellSidebar>Sidebar</ShellSidebar>
      <ShellContent>
        <section>
          <article>
            <h1>Timesheet Page Content</h1>
          </article>
        </section>
      </ShellContent>
      <ShellFooter>Footer</ShellFooter>
    </Shell>
  );
};

