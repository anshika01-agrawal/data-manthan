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
                color: "hsl(var(--chart-1))",
              },
              reference: {
                label: "Species Average",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={morphometricData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="parameter" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                  name="Current Sample"
                  dataKey="value"
                  stroke="var(--color-chart-1)"
                  fill="var(--color-chart-1)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Species Average"
                  dataKey="reference"
                  stroke="var(--color-chart-2)"
                  fill="var(--color-chart-2)"
                  fillOpacity={0.1}
                  strokeWidth={2}
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
                color: "hsl(var(--chart-1))",
              },
              mean: {
                label: "Population Mean",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shapeDescriptors} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="descriptor" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="current" fill="var(--color-chart-1)" name="Current Sample" />
                <Bar dataKey="mean" fill="var(--color-chart-3)" name="Population Mean" />
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
