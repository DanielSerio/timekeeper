import { Checkbox, Group, SegmentedControl, Skeleton } from "@mantine/core";
import React, { Suspense, useEffect, useState } from "react";

export const CHART_HEIGHT = 300;

const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

interface BreakdownChartPropsBasis {
  type?: "bar" | "radar";
  variant?: "stacked" | "grouped";
}

interface ChartConfig extends BreakdownChartPropsBasis {
  type: "bar" | "radar";
  variant: "stacked" | "grouped";
}

interface BreakdownBarChartProps extends BreakdownChartPropsBasis {
  type: "bar";
  variant: "stacked" | "grouped";
}

interface BreakdownRadarChartProps {
  type: "radar";
  variant?: never;
}

export type BreakdownChartProps =
  | BreakdownBarChartProps
  | BreakdownRadarChartProps;

function useBreakdownChart({ type, variant }: BreakdownChartProps) {
  const [chartConfig, _setChartConfig] = useState<ChartConfig>({
    type: type || "bar",
    variant: variant || "stacked",
  });

  useEffect(() => {
    if (
      variant &&
      variant !== chartConfig.variant &&
      type !== chartConfig.type
    ) {
      _setChartConfig({
        type,
        variant,
      });
    } else if (type !== chartConfig.type) {
      _setChartConfig((current) => ({ ...current, type }));
    } else if (variant && variant !== chartConfig.variant) {
      _setChartConfig((current) => ({ ...current, variant }));
    }
  }, [type, variant]);

  const state = {
    chartConfig,
  };

  const methods = {
    changeChartType: (nextType: "bar" | "radar") =>
      _setChartConfig((current) => ({
        ...current,
        type: nextType,
      })),
    changeChartVariant: (nextVariant: "grouped" | "stacked") =>
      _setChartConfig((current) => ({
        ...current,
        variant: nextVariant,
      })),
  };

  return [state, methods] as const;
}

export function BreakdownChart(props: BreakdownChartProps) {
  const [state, methods] = useBreakdownChart(props);
  const {
    chartConfig: { variant },
  } = state;

  const ChartComponent = React.lazy(async () => {
    switch (state.chartConfig.type) {
      case "bar":
        return {
          default: (await import("./BreakdownBar")).BreakdownBar,
        };
      case "radar":
        return {
          default: (await import("./BreakdownRadar")).BreakdownRadar,
        };
      default:
        throw new Error("Unsupported chart type");
    }
  });

  return (
    <div className="chart-container breakdown">
      <Group mb="md">
        <SegmentedControl
          data={[
            { value: "bar", label: "Bar" },
            { value: "radar", label: "Radar" },
          ]}
          value={state.chartConfig.type}
          onChange={(val) => {
            methods.changeChartType(val as "bar" | "radar");
          }}
        />
        {state.chartConfig.type === "bar" && <Checkbox label="Stacked?" />}
      </Group>
      <Suspense fallback={<Skeleton h={CHART_HEIGHT} w={"100%"} />}>
        <ChartComponent
          h={CHART_HEIGHT}
          data={data}
          dataKey="month"
          type={variant === "grouped" ? undefined : variant}
          series={[
            { name: "Smartphones", color: "violet.6" },
            { name: "Laptops", color: "blue.6" },
            { name: "Tablets", color: "teal.6" },
          ]}
        />
      </Suspense>
    </div>
  );
}
