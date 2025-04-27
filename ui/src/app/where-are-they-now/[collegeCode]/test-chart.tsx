"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Database } from "~/lib/supabase-types";
import { SelectableStats, StatisticLabels } from "./stat-select";
import { useCallback, useEffect, useState } from "react";

const getChartConfig = (selectedStat: SelectableStats) => {
  return {
    [selectedStat]: {
      label: StatisticLabels[selectedStat],
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;
};

export function TestChart({
  playerTotals,
  selectSeason,
  selectedStat,
}: {
  playerTotals: Database["public"]["Views"]["player_season_totals_with_details"]["Row"][];
  selectSeason: (season: number) => void;
  selectedStat: SelectableStats;
}) {
  const [chartConfig, setChartConfig] = useState(getChartConfig(selectedStat));

  useEffect(() => {
    setChartConfig(getChartConfig(selectedStat));
  }, [selectedStat]);

  const yearsToDisplay = Array.from(
    { length: 2025 - 2021 + 1 },
    (_, index) => 2021 + index,
  );

  const chartData = yearsToDisplay.map((year) => ({
    season: year,
    [selectedStat]: playerTotals
      .filter((pt) => pt.season === year)
      .reduce((acc, pt) => acc + pt[selectedStat]!, 0),
  }));

  const maxValue = Math.max(...chartData.map((d) => d[selectedStat] ?? 0));

  const yAxisTickFormatter = useCallback(
    (value: number) => {
      if (maxValue > 10000) {
        return (value / 1000).toLocaleString();
      }
      return value.toLocaleString();
    },
    [maxValue],
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          selectSeason(e.activePayload?.[0]?.payload.season as number);
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="season"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: number) => `'${value.toString().slice(2)}`}
        />
        <YAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          unit={maxValue > 10000 ? "k" : ""}
          tickFormatter={yAxisTickFormatter}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey={selectedStat}
          fill={`var(--color-${selectedStat})`}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
