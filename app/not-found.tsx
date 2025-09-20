"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/images/underwater-background.jpg')] bg-cover bg-center opacity-10"></div>
      <Card className="w-full max-w-md relative z-10 bg-slate-900/90 border-slate-700/50 backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <FileQuestion className="h-6 w-6 text-blue-400" />
          </div>
          <CardTitle className="text-blue-400">Page Not Found</CardTitle>
          <CardDescription className="text-slate-300">
            The marine research page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-slate-800/50 p-3 border border-slate-700/30">
            <p className="text-sm text-slate-400 text-center">
              Error 404 - This page could not be found in our ocean depths.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="border-cyan-600/50 text-cyan-300 hover:bg-cyan-600/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}