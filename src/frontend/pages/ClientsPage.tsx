import { Shell } from "../component/shell/Shell";
import { ShellContent } from "../component/shell/ShellContent";
import { ShellFooter } from "../component/shell/ShellFooter";
import { ShellHeader } from "../component/shell/ShellHeader";
import { ShellSidebar } from "../component/shell/ShellSidebar";

export const ClientsPage = () => {
  return (
    <Shell>
      <ShellHeader>Clients</ShellHeader>
      <ShellSidebar>Sidebar</ShellSidebar>
      <ShellContent>
        <section>
          <article>
            <h1>Clients Page Content</h1>
          </article>
        </section>
      </ShellContent>
      <ShellFooter>Footer</ShellFooter>
    </Shell>
  );
};

