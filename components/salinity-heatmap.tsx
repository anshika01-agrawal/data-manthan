"use client"

import { Badge } from "@/components/ui/badge"

export function SalinityHeatmap() {
  const salinityGrid = [
    [35.1, 35.2, 35.3, 35.4, 35.5],
    [35.0, 35.1, 35.2, 35.3, 35.4],
    [34.9, 35.0, 35.1, 35.2, 35.3],
    [34.8, 34.9, 35.0, 35.1, 35.2],
    [34.7, 34.8, 34.9, 35.0, 35.1],
  ]

  const getColorIntensity = (value: number) => {
    const min = 34.7
    const max = 35.5
    const intensity = (value - min) / (max - min)
    return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-1 aspect-square">
        {salinityGrid.flat().map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-xs font-medium rounded border"
            style={{ backgroundColor: getColorIntensity(value) }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "rgba(59, 130, 246, 0.3)" }}></div>
          <span>34.7 PSU</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "rgba(59, 130, 246, 1)" }}></div>
          <span>35.5 PSU</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-sm">Salinity Zones</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm">Coastal Waters</span>
          <Badge variant="outline">34.7-35.0 PSU</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Open Ocean</span>
          <Badge variant="secondary">35.1-35.3 PSU</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">High Salinity</span>
          <Badge variant="default">35.4-35.5 PSU</Badge>
        </div>
      </div>
    </div>
  )
}
