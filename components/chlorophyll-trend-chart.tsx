"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chlorophyllData = [
  { month: "Jan", chlorophyll: 0.8, upwelling: 2.1 },
  { month: "Feb", chlorophyll: 1.2, upwelling: 2.8 },
  { month: "Mar", chlorophyll: 1.8, upwelling: 3.5 },
  { month: "Apr", chlorophyll: 2.1, upwelling: 4.2 },
  { month: "May", chlorophyll: 2.4, upwelling: 4.8 },
  { month: "Jun", chlorophyll: 3.2, upwelling: 6.1 },
  { month: "Jul", chlorophyll: 4.1, upwelling: 7.3 },
  { month: "Aug", chlorophyll: 3.8, upwelling: 6.9 },
  { month: "Sep", chlorophyll: 2.9, upwelling: 5.4 },
  { month: "Oct", chlorophyll: 2.2, upwelling: 4.1 },
  { month: "Nov", chlorophyll: 1.5, upwelling: 3.2 },
  { month: "Dec", chlorophyll: 1.0, upwelling: 2.5 },
]

export function ChlorophyllTrendChart() {
  return (
    <ChartContainer
      config={{
        chlorophyll: {
          label: "Chlorophyll-a",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chlorophyllData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: "Chlorophyll-a (mg/m³)", angle: -90, position: "insideLeft" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="chlorophyll"
            stroke="var(--color-chart-2)"
            fill="var(--color-chart-2)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
