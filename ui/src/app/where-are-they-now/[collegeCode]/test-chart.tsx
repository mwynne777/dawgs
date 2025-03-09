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
import type collegesService from "~/app/(services)/colleges-service";

const chartConfig = {
  total_points: {
    label: "Points",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function TestChart({
  collegeStatTotals,
  historicalCollegeStatTotals,
}: {
  collegeStatTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeStatTotals>
  >;
  historicalCollegeStatTotals: Awaited<
    ReturnType<typeof collegesService.getHistoricalCollegeStatTotals>
  >;
}) {
  const chartData = [...historicalCollegeStatTotals, ...collegeStatTotals];

  console.log("chartData", chartData);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
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
          tickFormatter={(value: number) => value.toLocaleString()}
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
