import { FileUploadManager } from "@/components/file-upload-manager"
import { BackButton } from "@/components/back-button"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Marine Data Upload Center
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Upload your marine research data directly to MongoDB Atlas. 
              Support for CSV, Excel, and JSON formats with automatic schema mapping.
            </p>
          </div>
          
          <FileUploadManager />
        </div>
      </div>
    </div>
  )
}