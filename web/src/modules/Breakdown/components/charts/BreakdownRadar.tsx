import { RadarChart } from "@mantine/charts";
import type { BreakdownBaseChartProps } from "../../../Core/components/charts/types";

export function BreakdownRadar({ series, ...props }: BreakdownBaseChartProps) {
  return <RadarChart series={series} {...props} />;
}
