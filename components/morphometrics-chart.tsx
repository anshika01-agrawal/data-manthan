"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const morphometricData = [
  { parameter: "Length", value: 85, reference: 78 },
  { parameter: "Width", value: 92, reference: 88 },
  { parameter: "Area", value: 78, reference: 82 },
  { parameter: "Perimeter", value: 88, reference: 85 },
  { parameter: "Circularity", value: 76, reference: 79 },
  { parameter: "Aspect Ratio", value: 94, reference: 91 },
]

const shapeDescriptors = [
  { descriptor: "EFD1", current: 0.234, mean: 0.198, std: 0.045 },
  { descriptor: "EFD2", current: 0.156, mean: 0.142, std: 0.032 },
  { descriptor: "EFD3", current: 0.089, mean: 0.095, std: 0.028 },
  { descriptor: "EFD4", current: 0.067, mean: 0.071, std: 0.019 },
  { descriptor: "EFD5", current: 0.045, mean: 0.048, std: 0.015 },
]

export function MorphometricsChart() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart for Morphometric Comparison */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Morphometric Profile</h3>
          <ChartContainer
            config={{
              value: {
                label: "Current Sample",
                color: "#00d4ff",
              },
              reference: {
                label: "Species Average",
                color: "#00ff88",
              },
            }}
            className="h-[250px] md:h-[300px] chart-mobile-small"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={morphometricData}>
                <PolarGrid stroke="rgba(59, 130, 246, 0.3)" />
                <PolarAngleAxis 
                  dataKey="parameter" 
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 10 }}
                  tickCount={6}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                  name="Current Sample"
                  dataKey="value"
                  stroke="#00d4ff"
                  fill="#00d4ff"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Radar
                  name="Species Average"
                  dataKey="reference"
                  stroke="#00ff88"
                  fill="#00ff88"
                  fillOpacity={0.1}
                  strokeWidth={3}
                  strokeDasharray="5 5"
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Bar Chart for Shape Descriptors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Elliptic Fourier Descriptors</h3>
          <ChartContainer
            config={{
              current: {
                label: "Current",
                color: "#ffaa00",
              },
              mean: {
                label: "Population Mean",
                color: "#7c4dff",
              },
            }}
            className="h-[250px] md:h-[300px] chart-mobile-small"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shapeDescriptors} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.3)" />
                <XAxis 
                  dataKey="descriptor"
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
                  tickLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
                  tickLine={{ stroke: 'rgba(59, 130, 246, 0.5)' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="current" 
                  fill="#ffaa00" 
                  name="Current Sample"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="mean" 
                  fill="#7c4dff" 
                  name="Population Mean"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Statistical Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium">Basic Statistics</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Length/Width Ratio:</span>
              <span>1.43 ± 0.12</span>
            </div>
            <div className="flex justify-between">
              <span>Roundness Index:</span>
              <span>0.78 ± 0.08</span>
            </div>
            <div className="flex justify-between">
              <span>Form Factor:</span>
              <span>0.92 ± 0.05</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Shape Complexity</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Fractal Dimension:</span>
              <span>1.23</span>
            </div>
            <div className="flex justify-between">
              <span>Convexity:</span>
              <span>0.89</span>
            </div>
            <div className="flex justify-between">
              <span>Solidity:</span>
              <span>0.94</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Classification Confidence</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Morphometric Score:</span>
              <span>94.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Shape Similarity:</span>
              <span>91.7%</span>
            </div>
            <div className="flex justify-between">
              <span>Overall Confidence:</span>
              <span>92.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
