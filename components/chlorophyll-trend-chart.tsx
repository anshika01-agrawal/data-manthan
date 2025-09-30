"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { chlorophyllTrendData } from "@/lib/dummyData"

export function ChlorophyllTrendChart() {
  return (
    <ChartContainer
      config={{
        chlorophyll: {
          label: "Chlorophyll-a",
          color: "#00ff88",
        },
      }}
      className="h-[250px] md:h-[300px] chart-mobile-small"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chlorophyllTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.3)" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
            tickLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
          />
          <YAxis 
            label={{ value: "Chlorophyll-a (mg/m³)", angle: -90, position: "insideLeft", style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.8)' } }}
            tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
            tickLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="chlorophyll"
            stroke="#00ff88"
            fill="#00ff88"
            fillOpacity={0.2}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
