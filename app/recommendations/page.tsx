"use client"

import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw } from "lucide-react"
import { ChatbotButton } from "@/components/ui/chatbot-button"

const recommendations = [
  {
    meal: "Sarapan",
    suggestion: "Oatmeal dengan Buah-buahan",
    reason: "Kaya serat dan memberi energi untuk memulai hari",
    calories: 320,
    time: "07:00 - 08:00",
  },
  {
    meal: "Snack Pagi",
    suggestion: "Greek Yogurt dengan Granola",
    reason: "Protein tinggi untuk menjaga kenyang lebih lama",
    calories: 180,
    time: "10:00 - 10:30",
  },
  {
    meal: "Makan Siang",
    suggestion: "Grilled Chicken Salad",
    reason: "Protein lean dengan sayuran segar untuk nutrisi optimal",
    calories: 420,
    time: "12:00 - 13:00",
  },
  {
    meal: "Snack Sore",
    suggestion: "Almond & Buah Apel",
    reason: "Lemak sehat dan serat untuk energi sore hari",
    calories: 150,
    time: "15:00 - 16:00",
  },
  {
    meal: "Makan Malam",
    suggestion: "Salmon Panggang dengan Quinoa",
    reason: "Omega-3 dan protein berkualitas tinggi",
    calories: 480,
    time: "18:00 - 19:00",
  },
]

export default function RecommendationsPage() {
  const totalCalories = recommendations.reduce((sum, rec) => sum + rec.calories, 0)

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">AI Recommendations</h1>
              <p className="text-muted-foreground">Menu personal yang dirancang khusus untuk target Anda</p>
            </div>
            <Button className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Generate Ulang
            </Button>
          </div>

          {/* Daily Summary */}
          <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <CardTitle>Rencana Menu Hari Ini</CardTitle>
              </div>
              <CardDescription>
                Total kalori yang direkomendasikan: <span className="font-bold text-primary">{totalCalories} kal</span>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Meal Recommendations */}
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{rec.meal}</CardTitle>
                        <span className="text-sm text-muted-foreground">• {rec.time}</span>
                      </div>
                      <CardDescription className="text-base font-medium text-foreground">
                        {rec.suggestion}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{rec.calories}</div>
                      <div className="text-xs text-muted-foreground">kalori</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2 p-3 bg-secondary rounded-lg">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground text-pretty">
                      <span className="font-medium text-foreground">Mengapa?</span> {rec.reason}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips Card */}
          <Card className="bg-accent/10 border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">💡 Tips Hari Ini</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-pretty">• Minum air putih minimal 2 liter sepanjang hari untuk metabolisme optimal</p>
              <p className="text-pretty">
                • Usahakan makan dalam porsi kecil tapi sering untuk menjaga metabolisme tetap aktif
              </p>
              <p className="text-pretty">• Hindari makan 2-3 jam sebelum tidur untuk kualitas tidur yang lebih baik</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatbotButton />
    </div>
  )
}
