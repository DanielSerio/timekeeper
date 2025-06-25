import { CardGrid } from "#breakdown/components/CardGrid";
import { CategoryTimeCard } from "#breakdown/components/cards/CategoryTimeCard/CategoryTimeCard";
import { RecentTimesheetsCard } from "#breakdown/components/cards/RecentTimesheetsCard/RecentTimesheetsCard";
import { TimesheetStatsCard } from "#breakdown/components/cards/TimesheetStatsCard/TimesheetStatsCard";
import { Page } from "#core/components/Page";

export function BreakdownPage() {
  return (
    <Page>
      <CardGrid name="breakdown-cards">
        <CategoryTimeCard />
        <TimesheetStatsCard />
        <RecentTimesheetsCard />
      </CardGrid>
    </Page>
  );
}
