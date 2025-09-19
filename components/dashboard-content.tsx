import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Database, FileText, Download, Activity, Fish, Dna, Waves } from "lucide-react"
import { OceanographicChart } from "@/components/oceanographic-chart"
import { BiodiversityMap } from "@/components/biodiversity-map"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Marine Research Dashboard</h1>
          <p className="text-muted-foreground text-pretty">
            AI-driven platform for integrated ocean data analysis and biodiversity monitoring
          </p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Species Records</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">110,234</div>
            <p className="text-xs text-muted-foreground">IndOBIS database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">eDNA Samples</CardTitle>
            <Dna className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,456</div>
            <p className="text-xs text-muted-foreground">+8% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cruises</CardTitle>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">FORV Sagar Sampada</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Oceanographic Data Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Oceanographic Data Visualization
            </CardTitle>
            <CardDescription>Real-time ocean parameters from Arabian Sea monitoring stations</CardDescription>
          </CardHeader>
          <CardContent>
            <OceanographicChart />
          </CardContent>
        </Card>

        {/* Biodiversity Mapping */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Fish className="mr-2 h-5 w-5" />
              Species Distribution
            </CardTitle>
            <CardDescription>Marine biodiversity hotspots and species occurrence data</CardDescription>
          </CardHeader>
          <CardContent>
            <BiodiversityMap />
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest data processing and analysis updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">eDNA analysis completed</p>
                <p className="text-xs text-muted-foreground">Cruise AS-2024-03 samples processed</p>
              </div>
              <Badge variant="secondary">New</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Otolith morphometrics updated</p>
                <p className="text-xs text-muted-foreground">1,247 specimens analyzed</p>
              </div>
              <Badge variant="outline">Processing</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Chlorophyll data ingested</p>
                <p className="text-xs text-muted-foreground">Satellite imagery from MODIS</p>
              </div>
              <Badge variant="outline">Complete</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Processing Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data Ingestion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Oceanographic</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quality Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Validation</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">API Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>OBIS Sync</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
