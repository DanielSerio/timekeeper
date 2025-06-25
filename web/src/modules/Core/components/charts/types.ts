import type { BarChartProps, BarChartSeries, RadarChartProps, RadarChartSeries } from "@mantine/charts";

type MergedChartProps = Omit<RadarChartProps & BarChartProps, 'series' | 'classNames' | 'styles'>;

export interface BreakdownBaseChartProps extends MergedChartProps {
  series: (RadarChartSeries & BarChartSeries)[];
};