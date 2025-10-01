"use client"

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  FileText, 
  Database, 
  Check, 
  AlertCircle, 
  Download, 
  FileSpreadsheet,
  FileJson,
  Waves,
  Fish,
  Dna,
  Microscope,
  BarChart3
} from "lucide-react"
import { useDropzone } from 'react-dropzone'

interface UploadResult {
  success: boolean
  message: string
  results?: {
    totalRows: number
    savedCount: number
    errorCount: number
    errors: string[]
    dataType: string
    fileName: string
    fileSize: number
  }
  error?: string
}

const dataTypes = [
  { 
    value: 'species', 
    label: 'Species Data', 
    icon: Fish,
    description: 'Marine species information, taxonomy, and characteristics',
    sampleFields: ['scientificName', 'commonName', 'kingdom', 'phylum', 'class', 'longitude', 'latitude', 'depth']
  },
  { 
    value: 'oceanographic', 
    label: 'Oceanographic Data', 
    icon: Waves,
    description: 'Water quality, temperature, salinity, and chemical parameters',
    sampleFields: ['stationId', 'longitude', 'latitude', 'date', 'depth', 'temperature', 'salinity', 'pH', 'chlorophyll']
  },
  { 
    value: 'edna', 
    label: 'eDNA Analysis', 
    icon: Dna,
    description: 'Environmental DNA sampling and sequencing results',
    sampleFields: ['sampleId', 'siteName', 'collectionDate', 'longitude', 'latitude', 'totalReads', 'richness', 'shannon']
  },
  { 
    value: 'otolith', 
    label: 'Otolith Analysis', 
    icon: Microscope,
    description: 'Fish age determination and morphometric measurements',
    sampleFields: ['specimenId', 'species', 'length', 'width', 'weight', 'ageEstimate', 'captureDate', 'longitude', 'latitude']
  },
  { 
    value: 'genetic', 
    label: 'Genetic Sequences', 
    icon: BarChart3,
    description: 'DNA/RNA sequences and genetic analysis data',
    sampleFields: ['accessionNumber', 'organism', 'gene', 'sequenceType', 'sequenceLength', 'submissionDate']
  }
]

export function FileUploadManager() {
  const [selectedDataType, setSelectedDataType] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles)
    setUploadResult(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/json': ['.json']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleUpload = async () => {
    if (!uploadedFiles.length || !selectedDataType) {
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFiles[0])
      formData.append('dataType', selectedDataType)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result: UploadResult = await response.json()
      setUploadResult(result)

      if (result.success) {
        // Clear files after successful upload
        setTimeout(() => {
          setUploadedFiles([])
          setUploadProgress(0)
        }, 3000)
      }
    } catch (error) {
      setUploadResult({
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
        message: 'Failed to upload file'
      })
    } finally {
      setIsUploading(false)
    }
  }

  const downloadSampleFile = (dataType: string) => {
    const typeInfo = dataTypes.find(t => t.value === dataType)
    if (!typeInfo) return

    // Create sample CSV data
    const headers = typeInfo.sampleFields.join(',')
    const sampleRow = typeInfo.sampleFields.map(field => {
      switch (field) {
        case 'scientificName': return 'Sardinella longiceps'
        case 'commonName': return 'Indian Oil Sardine'
        case 'kingdom': return 'Animalia'
        case 'phylum': return 'Chordata'
        case 'class': return 'Actinopterygii'
        case 'longitude': return '75.1234'
        case 'latitude': return '13.5678'
        case 'depth': return '25.5'
        case 'stationId': return 'STATION_001'
        case 'date': return '2024-01-15'
        case 'temperature': return '28.5'
        case 'salinity': return '35.2'
        case 'pH': return '8.1'
        case 'chlorophyll': return '2.1'
        case 'sampleId': return 'eDNA_001'
        case 'siteName': return 'Mangalore Coast'
        case 'collectionDate': return '2024-01-15'
        case 'totalReads': return '150000'
        case 'richness': return '45'
        case 'shannon': return '3.2'
        case 'specimenId': return 'OTO_001'
        case 'species': return 'Sardinella longiceps'
        case 'length': return '8.5'
        case 'width': return '4.2'
        case 'weight': return '0.012'
        case 'ageEstimate': return '2'
        case 'captureDate': return '2024-01-10'
        case 'accessionNumber': return 'MN123456'
        case 'organism': return 'Thunnus albacares'
        case 'gene': return 'cytochrome oxidase subunit I'
        case 'sequenceType': return 'DNA'
        case 'sequenceLength': return '1551'
        case 'submissionDate': return '2024-01-15'
        default: return 'sample_value'
      }
    }).join(',')

    const csvContent = `${headers}\n${sampleRow}`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sample_${dataType}_data.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const selectedType = dataTypes.find(t => t.value === selectedDataType)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Data Upload Manager
          </CardTitle>
          <CardDescription>
            Upload marine research data in CSV, Excel, or JSON format to MongoDB Atlas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Data</TabsTrigger>
              <TabsTrigger value="samples">Sample Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              {/* Data Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Data Type</label>
                <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose the type of data you're uploading" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedType && (
                  <p className="text-sm text-muted-foreground">
                    {selectedType.description}
                  </p>
                )}
              </div>

              {/* File Upload Area */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {uploadedFiles.length > 0 ? (
                      <Check className="h-6 w-6 text-primary" />
                    ) : (
                      <Upload className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    {uploadedFiles.length > 0 ? (
                      <div>
                        <p className="font-medium text-primary">File Ready!</p>
                        <p className="text-sm text-muted-foreground">
                          {uploadedFiles[0].name} ({(uploadedFiles[0].size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">
                          {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to browse'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports CSV, Excel (.xlsx, .xls), and JSON files up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading to MongoDB Atlas...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {/* Upload Button */}
              <Button 
                onClick={handleUpload}
                disabled={!uploadedFiles.length || !selectedDataType || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Database className="mr-2 h-4 w-4 animate-spin" />
                    Uploading to Database...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Upload to MongoDB Atlas
                  </>
                )}
              </Button>

              {/* Upload Result */}
              {uploadResult && (
                <Alert className={uploadResult.success ? 'border-green-500' : 'border-red-500'}>
                  <div className="flex">
                    {uploadResult.success ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <div className="ml-2 space-y-2">
                      <AlertDescription>
                        <strong>{uploadResult.message}</strong>
                      </AlertDescription>
                      {uploadResult.results && (
                        <div className="text-sm space-y-1">
                          <div className="flex gap-4">
                            <Badge variant="secondary">
                              Total Rows: {uploadResult.results.totalRows}
                            </Badge>
                            <Badge variant="default">
                              Saved: {uploadResult.results.savedCount}
                            </Badge>
                            {uploadResult.results.errorCount > 0 && (
                              <Badge variant="destructive">
                                Errors: {uploadResult.results.errorCount}
                              </Badge>
                            )}
                          </div>
                          {uploadResult.results.errors.length > 0 && (
                            <div className="mt-2">
                              <p className="font-medium text-red-600">Sample Errors:</p>
                              <ul className="list-disc list-inside text-red-600 text-xs">
                                {uploadResult.results.errors.map((error, index) => (
                                  <li key={index}>{error}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="samples" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataTypes.map((type) => (
                  <Card key={type.value} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <type.icon className="h-5 w-5" />
                        {type.label}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {type.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Required Fields:</p>
                        <div className="flex flex-wrap gap-1">
                          {type.sampleFields.slice(0, 4).map((field) => (
                            <Badge key={field} variant="outline" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                          {type.sampleFields.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{type.sampleFields.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => downloadSampleFile(type.value)}
                        className="w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Sample CSV
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}