import { BarChart } from "@mantine/charts";
import type { BreakdownBaseChartProps } from "../../../Core/components/charts/types";

export function BreakdownBar({ series, ...props }: BreakdownBaseChartProps) {
  return <BarChart series={series} {...props} />;
}
