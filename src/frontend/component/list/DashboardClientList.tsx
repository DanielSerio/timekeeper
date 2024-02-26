import type { Client } from "../../../data/entity/client";

export interface DashboardClientListProps {
  clients?: Client[];
}
export const DashboardClientList = (props: DashboardClientListProps) => {
  return (
    <div className="dashboard-list client-list">
      <em>Clients</em>
      <div className="tag-list">
        {!props.clients?.length && (
          <>
            <h3 className="subtle">No clients yet. Add one now!</h3>
            <a href="/clients?modal=create-client" className="cta btn">
              Add Client
            </a>
          </>
        )}
      </div>
    </div>
  );
};

