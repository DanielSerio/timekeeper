import { BreakdownChart } from "#breakdown/components/charts/BreakdownChart";
import {} from "@mantine/charts";

export function TimeByCategoryChart() {
  return <BreakdownChart type="bar" variant="stacked" />;
}
