"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, Database, Fish, Waves } from "lucide-react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        const session = await getSession()
        if (session) {
          router.push("/")
          router.refresh()
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Floating marine elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Fish className="absolute top-20 left-10 h-8 w-8 text-blue-300/30 animate-bounce" style={{ animationDelay: '0s' }} />
        <Waves className="absolute top-40 right-20 h-12 w-12 text-teal-200/30 animate-pulse" style={{ animationDelay: '1s' }} />
        <Database className="absolute bottom-32 left-1/4 h-6 w-6 text-blue-400/30 animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      <Card className="w-full max-w-md glass-effect border-blue-200/20 shadow-2xl relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <Database className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-blue-100">
            Sign in to access the Data Manthan marine research platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-100">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="researcher@marine.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200/70 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-100">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200/70 focus:border-blue-400 focus:ring-blue-400 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-blue-200 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-500/50 bg-red-900/20">
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-200">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-300 hover:text-white font-medium transition-colors underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-300/20">
            <div className="text-center">
              <p className="text-xs text-blue-300/80 mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-200/70 space-y-1">
                <p>Email: researcher@marine.org</p>
                <p>Password: demo123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}