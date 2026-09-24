"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Salad } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, validate credentials
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)

      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("onboardingComplete")
      if (hasCompletedOnboarding) {
        router.push("/dashboard")
      } else {
        router.push("/onboarding")
      }
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
          <Salad className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold text-balance">Healthy Diet</CardTitle>
          <CardDescription className="text-base">Mulai perjalanan hidup sehat Anda hari ini</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <Button type="submit" className="w-full h-11 text-base font-medium">
            Masuk
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <button type="button" className="text-primary hover:underline font-medium">
              Daftar sekarang
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
