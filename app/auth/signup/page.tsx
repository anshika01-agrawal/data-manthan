"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Eye, EyeOff, Database, Fish, Waves, UserPlus } from "lucide-react"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    role: "user",
    researchArea: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          institution: formData.institution,
          role: formData.role,
          researchArea: formData.researchArea.split(",").map(area => area.trim()).filter(Boolean)
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to sign in...")
        setTimeout(() => {
          router.push("/auth/signin")
        }, 2000)
      } else {
        setError(data.error || "An error occurred")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

      <Card className="w-full max-w-lg glass-effect border-blue-200/20 shadow-2xl relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Join Data Manthan</CardTitle>
          <CardDescription className="text-blue-100">
            Create your account to access marine research data and tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-100">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Dr. Marine Researcher"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200/70 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-100">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="researcher@marine.org"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200/70 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-100">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
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
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-100">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200/70 focus:border-blue-400 focus:ring-blue-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-blue-200 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution" className="text-blue-100">Institution (Optional)</Label>
              <Input
                id="institution"
                type="text"
                placeholder="Marine Research Institute"
                value={formData.institution}
                onChange={(e) => handleInputChange("institution", e.target.value)}
                className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200/70 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-blue-100">Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className="bg-white/10 border-blue-300/30 text-white focus:border-blue-400 focus:ring-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">General User</SelectItem>
                  <SelectItem value="researcher">Researcher</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="researchArea" className="text-blue-100">Research Areas (Optional)</Label>
              <Input
                id="researchArea"
                type="text"
                placeholder="Marine Biology, Oceanography, eDNA (comma separated)"
                value={formData.researchArea}
                onChange={(e) => handleInputChange("researchArea", e.target.value)}
                className="bg-white/10 border-blue-300/30 text-white placeholder:text-blue-200/70 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {error && (
              <Alert className="border-red-500/50 bg-red-900/20">
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500/50 bg-green-900/20">
                <AlertDescription className="text-green-200">
                  {success}
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-200">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-300 hover:text-white font-medium transition-colors underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}