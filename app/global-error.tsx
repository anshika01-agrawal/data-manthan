"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('/images/underwater-background.jpg')] bg-cover bg-center opacity-10"></div>
          <Card className="w-full max-w-md relative z-10 bg-slate-900/90 border-slate-700/50 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <CardTitle className="text-red-400">Critical System Error</CardTitle>
              <CardDescription className="text-slate-300">
                A critical error has occurred in the marine research platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-slate-800/50 p-3 border border-slate-700/30">
                <p className="text-sm font-mono text-slate-400">
                  {error.message || "Unknown critical error occurred"}
                </p>
                {error.digest && (
                  <p className="text-xs text-slate-500 mt-1">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={reset} 
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Application
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/"}
                  className="border-cyan-600/50 text-cyan-300 hover:bg-cyan-600/10"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}