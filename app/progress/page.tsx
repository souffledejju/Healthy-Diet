"use client"

import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, Calendar } from "lucide-react"
import { ChatbotButton } from "@/components/ui/chatbot-button"

const progressData = [
  { week: "Week 1", weight: 75, target: 70 },
  { week: "Week 2", weight: 74.5, target: 70 },
  { week: "Week 3", weight: 74, target: 70 },
  { week: "Week 4", weight: 73.2, target: 70 },
]

export default function ProgressPage() {
  const currentWeight = progressData[progressData.length - 1].weight
  const startWeight = progressData[0].weight
  const targetWeight = progressData[0].target
  const totalLoss = startWeight - currentWeight
  const remaining = currentWeight - targetWeight

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">Progress Tracking</h1>
            <p className="text-muted-foreground">Pantau perkembangan perjalanan diet Anda</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <CardDescription>Berat Awal</CardDescription>
                </div>
                <CardTitle className="text-2xl">{startWeight} kg</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingDown className="w-4 h-4" />
                  <CardDescription>Total Turun</CardDescription>
                </div>
                <CardTitle className="text-2xl text-primary">{totalLoss.toFixed(1)} kg</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <CardDescription>Sisa Target</CardDescription>
                </div>
                <CardTitle className="text-2xl text-accent">{remaining.toFixed(1)} kg</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <CardDescription>Progress</CardDescription>
                </div>
                <CardTitle className="text-2xl text-chart-3">
                  {((totalLoss / (startWeight - targetWeight)) * 100).toFixed(0)}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Grafik Perkembangan Berat Badan</CardTitle>
              <CardDescription>4 minggu terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.map((data, index) => {
                  const progress = ((startWeight - data.weight) / (startWeight - targetWeight)) * 100
                  return (
                    <div key={data.week} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{data.week}</span>
                        <span className="text-muted-foreground">{data.weight} kg</span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Mingguan</CardTitle>
                <CardDescription>Pencapaian minggu ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hari aktif</span>
                  <span className="font-semibold">5/7 hari</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rata-rata kalori</span>
                  <span className="font-semibold">1,650 kal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Target air minum</span>
                  <span className="font-semibold">8/8 gelas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Olahraga</span>
                  <span className="font-semibold">4x seminggu</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Motivasi</CardTitle>
                <CardDescription>Terus semangat!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-pretty">
                      🎉 Luar biasa! Anda sudah berhasil menurunkan{" "}
                      <span className="font-bold text-primary">{totalLoss.toFixed(1)} kg</span> dari target Anda. Terus
                      pertahankan!
                    </p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm text-pretty">
                      💪 Konsistensi adalah kunci. Anda hanya perlu{" "}
                      <span className="font-bold text-accent">{remaining.toFixed(1)} kg</span> lagi untuk mencapai
                      target!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ChatbotButton />
    </div>
  )
}
