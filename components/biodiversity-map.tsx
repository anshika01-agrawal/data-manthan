"use client"
import { Badge } from "@/components/ui/badge"

export function BiodiversityMap() {
  const speciesData = [
    { name: "Sardinella longiceps", count: 1247, status: "Abundant" },
    { name: "Rastrelliger kanagurta", count: 892, status: "Common" },
    { name: "Decapterus russelli", count: 634, status: "Moderate" },
    { name: "Auxis thazard", count: 423, status: "Rare" },
  ]

  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src="/images/mixed-layer-depth.png"
          alt="Mixed layer depth visualization from oceanographic research"
          className="w-full rounded-lg border"
        />
        <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded-lg p-2">
          <p className="text-xs font-medium">Arabian Sea</p>
          <p className="text-xs text-muted-foreground">Mixed Layer Depth</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Recent Species Detections</h4>
        {speciesData.map((species, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium text-sm">{species.name}</p>
              <p className="text-xs text-muted-foreground">{species.count} specimens</p>
            </div>
            <Badge
              variant={
                species.status === "Abundant"
                  ? "default"
                  : species.status === "Common"
                    ? "secondary"
                    : species.status === "Moderate"
                      ? "outline"
                      : "destructive"
              }
            >
              {species.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
