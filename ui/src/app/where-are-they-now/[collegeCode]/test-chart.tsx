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

const chartConfig = {
  total_points: {
    label: "Points",
    color: "hsl(var(--primary))",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "#60a5fa",
  // },
} satisfies ChartConfig;

export function TestChart({
  playerTotals,
  selectSeason,
}: {
  playerTotals: Database["public"]["Views"]["player_season_totals_with_details"]["Row"][];
  selectSeason: (season: number) => void;
}) {
  console.log("playerTotals", playerTotals);
  const yearsToDisplay = Array.from(
    { length: 2025 - 2022 + 1 },
    (_, index) => 2022 + index,
  );

  const chartData = yearsToDisplay.map((year) => ({
    season: year,
    total_points: playerTotals
      .filter((pt) => pt.season === year)
      .reduce((acc, pt) => acc + (pt.points ?? 0), 0),
  }));

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
          tickFormatter={(value: number) => (value / 1000).toLocaleString()}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="total_points"
          fill="var(--color-total_points)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
