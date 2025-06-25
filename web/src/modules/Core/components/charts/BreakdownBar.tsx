import { BarChart } from "@mantine/charts";
import type { BreakdownBaseChartProps } from "./types";

export function BreakdownBar({ series, ...props }: BreakdownBaseChartProps) {
  return <BarChart series={series} {...props} />;
}
