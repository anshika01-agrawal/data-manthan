"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { temperatureProfileData } from "@/lib/dummyData"

export function TemperatureDepthChart() {
  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature",
          color: "#00d4ff",
        },
      }}
      className="h-[300px] md:h-[400px] chart-mobile-small"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={temperatureProfileData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.3)" />
          <XAxis 
            dataKey="temperature" 
            label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5, style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.8)' } }}
            tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
            tickLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
          />
          <YAxis 
            dataKey="depth" 
            reversed 
            label={{ value: "Depth (m)", angle: -90, position: "insideLeft", style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.8)' } }}
            tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
            tickLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#00d4ff"
            strokeWidth={3}
            dot={{ fill: "#00d4ff", strokeWidth: 2, r: 4, stroke: '#ffffff' }}
            activeDot={{ r: 6, fill: '#00d4ff', stroke: '#ffffff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
