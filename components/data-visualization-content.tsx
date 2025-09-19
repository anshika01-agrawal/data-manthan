"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter, Map, BarChart3, Activity } from "lucide-react"
import { InteractiveOceanMap } from "@/components/interactive-ocean-map"
import { TemperatureDepthChart } from "@/components/temperature-depth-chart"
import { ChlorophyllTrendChart } from "@/components/chlorophyll-trend-chart"
import { SalinityHeatmap } from "@/components/salinity-heatmap"

export function DataVisualizationContent() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Data Visualization Dashboard</h1>
          <p className="text-muted-foreground text-pretty">
            Interactive visualization of oceanographic parameters and marine biodiversity data
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visualization Controls</CardTitle>
          <CardDescription>Configure data layers and parameters for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Region</label>
              <Select defaultValue="arabian-sea">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
                  <SelectItem value="bay-of-bengal">Bay of Bengal</SelectItem>
                  <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Parameter</label>
              <Select defaultValue="temperature">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Sea Surface Temperature</SelectItem>
                  <SelectItem value="chlorophyll">Chlorophyll-a</SelectItem>
                  <SelectItem value="salinity">Salinity</SelectItem>
                  <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Depth Layer</label>
              <Select defaultValue="surface">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surface">Surface (0-10m)</SelectItem>
                  <SelectItem value="mixed">Mixed Layer (10-50m)</SelectItem>
                  <SelectItem value="thermocline">Thermocline (50-200m)</SelectItem>
                  <SelectItem value="deep">Deep Water &gt;200m</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Visualization Tabs */}
      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="map" className="flex items-center">
            <Map className="mr-2 h-4 w-4" />
            Interactive Map
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Trend Analysis
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Depth Profiles
          </TabsTrigger>
          <TabsTrigger value="correlations" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Correlations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Interactive Ocean Map</CardTitle>
                <CardDescription>Real-time oceanographic data with sampling locations</CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveOceanMap />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Data Layers</CardTitle>
                <CardDescription>Toggle visualization layers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                    <span className="text-sm">Sea Surface Temperature</span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                    <span className="text-sm">Chlorophyll-a Concentration</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                    <span className="text-sm">Sampling Stations</span>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                    <span className="text-sm">Species Occurrences</span>
                  </div>
                  <Badge variant="outline">Inactive</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chlorophyll-a Trends</CardTitle>
                <CardDescription>Seasonal variations in primary productivity</CardDescription>
              </CardHeader>
              <CardContent>
                <ChlorophyllTrendChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salinity Distribution</CardTitle>
                <CardDescription>Spatial and temporal salinity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <SalinityHeatmap />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temperature-Depth Profiles</CardTitle>
              <CardDescription>Vertical structure of water column properties</CardDescription>
            </CardHeader>
            <CardContent>
              <TemperatureDepthChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Parameter Correlations</CardTitle>
                <CardDescription>Statistical relationships between ocean variables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Temperature vs Chlorophyll</span>
                    <Badge variant="destructive">r = -0.72</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Salinity vs Depth</span>
                    <Badge variant="default">r = 0.84</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Oxygen vs Temperature</span>
                    <Badge variant="secondary">r = -0.56</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ecosystem Indicators</CardTitle>
                <CardDescription>Key metrics for ecosystem health assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Primary Productivity Index</span>
                    <Badge variant="default">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Upwelling Intensity</span>
                    <Badge variant="secondary">Moderate</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Oxygen Minimum Zone</span>
                    <Badge variant="destructive">Expanding</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
