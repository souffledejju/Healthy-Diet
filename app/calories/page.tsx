"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Calculator } from "lucide-react"
import { ChatbotButton } from "@/components/ui/chatbot-button"

interface FoodEntry {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function CaloriesPage() {
  const [entries, setEntries] = useState<FoodEntry[]>([])
  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")

  const addEntry = () => {
    if (!foodName || !calories) return

    const newEntry: FoodEntry = {
      id: Date.now(),
      name: foodName,
      calories: Number.parseInt(calories),
      protein: Math.round((Number.parseInt(calories) * 0.25) / 4), // Estimate
      carbs: Math.round((Number.parseInt(calories) * 0.5) / 4), // Estimate
      fat: Math.round((Number.parseInt(calories) * 0.25) / 9), // Estimate
    }

    setEntries([...entries, newEntry])
    setFoodName("")
    setCalories("")
  }

  const removeEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0)
  const totalProtein = entries.reduce((sum, entry) => sum + entry.protein, 0)
  const totalCarbs = entries.reduce((sum, entry) => sum + entry.carbs, 0)
  const totalFat = entries.reduce((sum, entry) => sum + entry.fat, 0)

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">Auto Calorie Counter</h1>
            <p className="text-muted-foreground">Hitung dan pantau asupan kalori harian Anda</p>
          </div>

          {/* Add Food Entry */}
          <Card>
            <CardHeader>
              <CardTitle>Tambah Makanan</CardTitle>
              <CardDescription>Masukkan makanan yang Anda konsumsi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="foodName">Nama Makanan</Label>
                  <Input
                    id="foodName"
                    placeholder="Contoh: Nasi Goreng"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Label htmlFor="calories">Kalori</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="350"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addEntry} className="h-11 gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Ringkasan Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Kalori</p>
                  <p className="text-2xl font-bold text-primary">{totalCalories}</p>
                  <p className="text-xs text-muted-foreground">kal</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Protein</p>
                  <p className="text-2xl font-bold">{totalProtein}</p>
                  <p className="text-xs text-muted-foreground">gram</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Karbohidrat</p>
                  <p className="text-2xl font-bold">{totalCarbs}</p>
                  <p className="text-xs text-muted-foreground">gram</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Lemak</p>
                  <p className="text-2xl font-bold">{totalFat}</p>
                  <p className="text-xs text-muted-foreground">gram</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Food Entries List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Makanan</CardTitle>
              <CardDescription>{entries.length} item tercatat hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada makanan yang dicatat. Mulai tambahkan makanan Anda!
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{entry.name}</p>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{entry.calories} kal</span>
                          <span>P: {entry.protein}g</span>
                          <span>C: {entry.carbs}g</span>
                          <span>F: {entry.fat}g</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEntry(entry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatbotButton />
    </div>
  )
}
