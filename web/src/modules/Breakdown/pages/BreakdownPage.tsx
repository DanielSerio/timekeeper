import { CardGrid } from "#breakdown/components/CardGrid";
import { CategoryTimeCard } from "#breakdown/components/cards/CategoryTimeCard/CategoryTimeCard";
import { Page } from "#core/components/Page";
import { BreakdownCard } from "../components/BreakdownCard";

export function BreakdownPage() {
  return (
    <Page>
      <CardGrid name="breakdown-cards">
        <CategoryTimeCard />
        <BreakdownCard
          title="Test Card"
          renderActions={() => <span>Actions</span>}
        >
          <p>Some Content</p>
        </BreakdownCard>
        <BreakdownCard
          title="Test Card"
          renderActions={() => <span>Actions</span>}
        >
          <p>Some Content</p>
        </BreakdownCard>
      </CardGrid>
    </Page>
  );
}
