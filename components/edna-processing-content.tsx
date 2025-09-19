"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Dna, BarChart3, Download, Database, Zap, FileText, Microscope } from "lucide-react"
import { SequenceQualityChart } from "@/components/sequence-quality-chart"
import { TaxonomicComposition } from "@/components/taxonomic-composition"
import { BiodiversityMetrics } from "@/components/biodiversity-metrics"
import { SequenceViewer } from "@/components/sequence-viewer"

export function EdnaProcessingContent() {
  const [processingStage, setProcessingStage] = useState<"upload" | "processing" | "complete">("upload")
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleSequenceUpload = () => {
    setProcessingStage("processing")
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setProcessingStage("complete")
      }
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">eDNA Processing System</h1>
          <p className="text-muted-foreground text-pretty">
            Environmental DNA analysis pipeline for marine biodiversity assessment
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Protocols
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Sample Upload & Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Sample Upload & Metadata
          </CardTitle>
          <CardDescription>Upload FASTQ files and provide sample metadata following MIxS standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Dna className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">Upload FASTQ files (paired-end sequencing data)</p>
                <Button onClick={handleSequenceUpload} disabled={processingStage === "processing"}>
                  {processingStage === "processing" ? "Processing..." : "Select FASTQ Files"}
                </Button>
              </div>

              {processingStage === "processing" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality Control</span>
                      <span>{Math.min(uploadProgress, 25)}%</span>
                    </div>
                    <Progress value={Math.min(uploadProgress, 25)} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sequence Filtering</span>
                      <span>{Math.max(0, Math.min(uploadProgress - 25, 25))}%</span>
                    </div>
                    <Progress value={Math.max(0, Math.min(uploadProgress - 25, 25))} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Taxonomic Assignment</span>
                      <span>{Math.max(0, Math.min(uploadProgress - 50, 25))}%</span>
                    </div>
                    <Progress value={Math.max(0, Math.min(uploadProgress - 50, 25))} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Biodiversity Analysis</span>
                      <span>{Math.max(0, uploadProgress - 75)}%</span>
                    </div>
                    <Progress value={Math.max(0, uploadProgress - 75)} />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sample-id">Sample ID</Label>
                  <Input id="sample-id" placeholder="AS-eDNA-2024-001" />
                </div>
                <div>
                  <Label htmlFor="collection-date">Collection Date</Label>
                  <Input id="collection-date" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" placeholder="12.9716° N" />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" placeholder="74.7965° E" />
                </div>
              </div>

              <div>
                <Label htmlFor="depth">Sampling Depth (m)</Label>
                <Input id="depth" placeholder="10" type="number" />
              </div>

              <div>
                <Label htmlFor="primer">Target Gene/Primer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primer set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16s">16S rRNA (bacteria)</SelectItem>
                    <SelectItem value="18s">18S rRNA (eukaryotes)</SelectItem>
                    <SelectItem value="coi">COI (metazoans)</SelectItem>
                    <SelectItem value="12s">12S rRNA (fish)</SelectItem>
                    <SelectItem value="its">ITS (fungi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="environment">Environment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coastal">Coastal water</SelectItem>
                    <SelectItem value="offshore">Offshore water</SelectItem>
                    <SelectItem value="estuary">Estuarine</SelectItem>
                    <SelectItem value="sediment">Marine sediment</SelectItem>
                    <SelectItem value="coral">Coral reef</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Results */}
      {processingStage === "complete" && (
        <Tabs defaultValue="quality" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="quality" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Quality Control
            </TabsTrigger>
            <TabsTrigger value="taxonomy" className="flex items-center">
              <Database className="mr-2 h-4 w-4" />
              Taxonomy
            </TabsTrigger>
            <TabsTrigger value="biodiversity" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Biodiversity
            </TabsTrigger>
            <TabsTrigger value="sequences" className="flex items-center">
              <Dna className="mr-2 h-4 w-4" />
              Sequences
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quality" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sequence Quality Metrics</CardTitle>
                  <CardDescription>Quality scores and filtering statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <SequenceQualityChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Processing Summary</CardTitle>
                  <CardDescription>Pipeline statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Raw Reads</span>
                      <Badge variant="outline">2,847,392</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Quality Filtered</span>
                      <Badge variant="secondary">2,234,156</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Merged Pairs</span>
                      <Badge variant="secondary">1,987,432</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Unique ASVs</span>
                      <Badge variant="default">1,247</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Quality Thresholds</h4>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Min Quality Score:</span>
                        <span>Q30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min Length:</span>
                        <span>150 bp</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Expected Errors:</span>
                        <span>2</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="taxonomy" className="space-y-4">
            <TaxonomicComposition />
          </TabsContent>

          <TabsContent value="biodiversity" className="space-y-4">
            <BiodiversityMetrics />
          </TabsContent>

          <TabsContent value="sequences" className="space-y-4">
            <SequenceViewer />
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Export Options</CardTitle>
                  <CardDescription>Download processed data in various formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    ASV Table (CSV)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Taxonomic Assignments (TSV)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Representative Sequences (FASTA)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Phylogenetic Tree (Newick)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    BIOM Format
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Database Integration</CardTitle>
                  <CardDescription>Submit to public repositories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Database className="mr-2 h-4 w-4" />
                    Submit to IndOBIS
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Export to GBIF
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Submit to NCBI SRA
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Microscope className="mr-2 h-4 w-4" />
                    Generate Darwin Core Archive
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
