"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChefHat, Calculator, Sparkles, TrendingUp, Plus } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ChatbotButton } from "@/components/ui/chatbot-button"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const onboardingComplete = localStorage.getItem("onboardingComplete")

    if (!isLoggedIn) {
      router.push("/")
    } else if (!onboardingComplete) {
      router.push("/onboarding")
    } else {
      const data = localStorage.getItem("userData")
      if (data) {
        setUserData(JSON.parse(data))
      }
    }
  }, [router])

  const bmi = userData
    ? (Number.parseFloat(userData.weight) / Math.pow(Number.parseFloat(userData.height) / 100, 2)).toFixed(1)
    : 0

  const features = [
    {
      title: "Recipes & Ingredients",
      description: "Jelajahi resep sehat dengan informasi nutrisi lengkap",
      icon: ChefHat,
      href: "/recipes",
      color: "text-primary",
    },
    {
      title: "Auto Calorie Counter",
      description: "Hitung kalori makanan Anda secara otomatis",
      icon: Calculator,
      href: "/calories",
      color: "text-accent",
    },
    {
      title: "AI Recommendations",
      description: "Dapatkan rekomendasi menu personal dari AI",
      icon: Sparkles,
      href: "/recommendations",
      color: "text-chart-3",
    },
    {
      title: "Progress Tracking",
      description: "Pantau perkembangan perjalanan diet Anda",
      icon: TrendingUp,
      href: "/progress",
      color: "text-chart-2",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">Selamat Datang Kembali! 👋</h1>
            <p className="text-muted-foreground">Mari lanjutkan perjalanan hidup sehat Anda hari ini</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Berat Badan Saat Ini</CardDescription>
                <CardTitle className="text-3xl text-primary">{userData?.weight} kg</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Target Berat Badan</CardDescription>
                <CardTitle className="text-3xl text-accent">{userData?.targetWeight} kg</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>BMI Anda</CardDescription>
                <CardTitle className="text-3xl text-chart-3">{bmi}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Feature Cards */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Fitur Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.title}
                    className="hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => router.push(feature.href)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-secondary ${feature.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                          <CardDescription className="text-sm">{feature.description}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      <ChatbotButton />
    </div>
  )
}
