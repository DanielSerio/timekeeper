import { RadarChart } from "@mantine/charts";
import type { BreakdownBaseChartProps } from "./types";

export function BreakdownRadar({ series, ...props }: BreakdownBaseChartProps) {
  return <RadarChart series={series} {...props} />;
}
