"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const depthData = [
  { depth: 0, temperature: 28.5, salinity: 35.2 },
  { depth: 10, temperature: 28.3, salinity: 35.3 },
  { depth: 25, temperature: 27.8, salinity: 35.4 },
  { depth: 50, temperature: 26.2, salinity: 35.6 },
  { depth: 75, temperature: 24.1, salinity: 35.8 },
  { depth: 100, temperature: 21.5, salinity: 36.0 },
  { depth: 150, temperature: 18.3, salinity: 36.2 },
  { depth: 200, temperature: 15.8, salinity: 36.1 },
  { depth: 300, temperature: 12.4, salinity: 35.9 },
  { depth: 500, temperature: 8.7, salinity: 35.5 },
]

export function TemperatureDepthChart() {
  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={depthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }} />
          <YAxis dataKey="depth" reversed label={{ value: "Depth (m)", angle: -90, position: "insideLeft" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
