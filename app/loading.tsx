import { Loader2, Waves } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/images/underwater-background.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 text-center">
        <div className="mb-6">
          <div className="relative inline-block">
            <Waves className="h-16 w-16 text-cyan-400 animate-pulse" />
            <Loader2 className="h-8 w-8 text-cyan-300 animate-spin absolute top-4 left-4" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
          Loading Marine Data
        </h2>
        <p className="text-slate-400 animate-pulse">
          Diving deep into the ocean of information...
        </p>
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}