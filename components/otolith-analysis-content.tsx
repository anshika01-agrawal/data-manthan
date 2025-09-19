"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Microscope, BarChart3, Download, Eye, Zap, FileImage } from "lucide-react"
import { OtolithViewer } from "@/components/otolith-viewer"
import { MorphometricsChart } from "@/components/morphometrics-chart"
import { SpeciesClassification } from "@/components/species-classification"

export function OtolithAnalysisContent() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "processing" | "complete">("idle")

  const handleFileUpload = () => {
    setAnalysisStatus("processing")
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setAnalysisStatus("complete")
      }
    }, 200)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Otolith Analysis Module</h1>
          <p className="text-muted-foreground text-pretty">
            AI-powered otolith shape analysis and morphometrics for species identification
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileImage className="mr-2 h-4 w-4" />
            Batch Upload
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Otolith Image Upload
          </CardTitle>
          <CardDescription>Upload high-resolution otolith images for automated analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop otolith images here, or click to browse
                </p>
                <Button onClick={handleFileUpload} disabled={analysisStatus === "processing"}>
                  {analysisStatus === "processing" ? "Processing..." : "Select Images"}
                </Button>
              </div>

              {analysisStatus === "processing" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing images...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="species">Expected Species (Optional)</Label>
                <Input id="species" placeholder="e.g., Sardinella longiceps" />
              </div>
              <div>
                <Label htmlFor="location">Collection Location</Label>
                <Input id="location" placeholder="e.g., Arabian Sea, Kochi" />
              </div>
              <div>
                <Label htmlFor="date">Collection Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisStatus === "complete" && (
        <Tabs defaultValue="viewer" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="viewer" className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              Otolith Viewer
            </TabsTrigger>
            <TabsTrigger value="morphometrics" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Morphometrics
            </TabsTrigger>
            <TabsTrigger value="classification" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              AI Classification
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center">
              <Microscope className="mr-2 h-4 w-4" />
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Interactive Otolith Viewer</CardTitle>
                  <CardDescription>Zoom, measure, and annotate otolith features</CardDescription>
                </CardHeader>
                <CardContent>
                  <OtolithViewer />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Image Analysis</CardTitle>
                  <CardDescription>Automated feature extraction results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Image Quality</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Contour Detection</span>
                      <Badge variant="default">98.5%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Landmark Points</span>
                      <Badge variant="secondary">24 detected</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Basic Measurements</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Length:</span>
                        <span>12.4 mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Width:</span>
                        <span>8.7 mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span>84.2 mm²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Perimeter:</span>
                        <span>38.6 mm</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="morphometrics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Morphometric Analysis</CardTitle>
                <CardDescription>Shape descriptors and statistical analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <MorphometricsChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classification" className="space-y-4">
            <SpeciesClassification />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reference Database</CardTitle>
                  <CardDescription>Compare with known specimens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Sardinella longiceps</p>
                        <p className="text-xs text-muted-foreground">Indian Oil Sardine</p>
                      </div>
                      <Badge variant="default">95.2% match</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Sardinella gibbosa</p>
                        <p className="text-xs text-muted-foreground">Goldstripe Sardine</p>
                      </div>
                      <Badge variant="secondary">87.3% match</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Rastrelliger kanagurta</p>
                        <p className="text-xs text-muted-foreground">Indian Mackerel</p>
                      </div>
                      <Badge variant="outline">72.1% match</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistical Comparison</CardTitle>
                  <CardDescription>Morphometric differences analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Shape Index Similarity</span>
                        <span>94.7%</span>
                      </div>
                      <Progress value={94.7} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fourier Descriptor Match</span>
                        <span>91.3%</span>
                      </div>
                      <Progress value={91.3} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Landmark Alignment</span>
                        <span>88.9%</span>
                      </div>
                      <Progress value={88.9} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
