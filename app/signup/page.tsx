"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, Mail, Lock, User, Loader2, Globe, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setError(data.message || "Something went wrong")
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen poly-gradient flex items-center justify-center p-4">
        <Card className="w-full max-w-md poly-card shadow-2xl border-0">
          <CardContent className="text-center py-12">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-6 animate-poly-glow">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold poly-text mb-4">Account Created!</h2>
            <p className="text-gray-300 text-lg mb-6">
              Your Polyverse account has been created successfully. Redirecting to sign in...
            </p>
            <div className="animate-spin mx-auto w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen poly-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md poly-card shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 poly-button rounded-full flex items-center justify-center mb-6 animate-poly-glow">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold poly-text">Create Account</CardTitle>
          <p className="text-gray-300 text-lg">Join Polyverse to save your translations</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="border-red-500/50 bg-red-900/20">
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="name" className="text-gray-300 font-semibold uppercase tracking-wider">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-12 h-12 bg-gray-800/50 border-gray-600 text-white text-lg placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-300 font-semibold uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-12 h-12 bg-gray-800/50 border-gray-600 text-white text-lg placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-300 font-semibold uppercase tracking-wider">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="pl-12 h-12 bg-gray-800/50 border-gray-600 text-white text-lg placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-gray-300 font-semibold uppercase tracking-wider">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-12 h-12 bg-gray-800/50 border-gray-600 text-white text-lg placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full poly-button text-white font-bold py-3 text-lg rounded-lg shadow-2xl transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Sign Up
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
