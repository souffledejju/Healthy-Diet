"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Clock, Flame, Heart } from "lucide-react"
import { ChatbotButton } from "@/components/ui/chatbot-button"

const recipes = [
  {
    id: 1,
    name: "Salad Quinoa Mediterranean",
    calories: 320,
    time: "15 menit",
    image: "/mediterranean-quinoa-salad.png",
    category: "Salad",
    protein: "12g",
    carbs: "45g",
    fat: "8g",
  },
  {
    id: 2,
    name: "Grilled Chicken Bowl",
    calories: 420,
    time: "25 menit",
    image: "/healthy-grilled-chicken-bowl.jpg",
    category: "Main Course",
    protein: "35g",
    carbs: "32g",
    fat: "12g",
  },
  {
    id: 3,
    name: "Smoothie Bowl Tropical",
    calories: 280,
    time: "10 menit",
    image: "/tropical-smoothie-bowl.jpg",
    category: "Breakfast",
    protein: "8g",
    carbs: "52g",
    fat: "6g",
  },
  {
    id: 4,
    name: "Salmon Teriyaki dengan Sayuran",
    calories: 480,
    time: "30 menit",
    image: "/teriyaki-salmon-vegetables.jpg",
    category: "Main Course",
    protein: "38g",
    carbs: "28g",
    fat: "18g",
  },
  {
    id: 5,
    name: "Avocado Toast Protein",
    calories: 350,
    time: "8 menit",
    image: "/protein-avocado-toast.jpg",
    category: "Breakfast",
    protein: "18g",
    carbs: "35g",
    fat: "14g",
  },
  {
    id: 6,
    name: "Buddha Bowl Vegan",
    calories: 380,
    time: "20 menit",
    image: "/vegan-buddha-bowl.png",
    category: "Vegan",
    protein: "15g",
    carbs: "58g",
    fat: "10g",
  },
]

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">Recipes & Ingredients</h1>
            <p className="text-muted-foreground">Temukan resep sehat dengan informasi nutrisi lengkap</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari resep..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 rounded-full"
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(recipe.id) ? "fill-destructive text-destructive" : ""}`}
                    />
                  </Button>
                  <Badge className="absolute bottom-3 left-3">{recipe.category}</Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {recipe.calories} kal
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground">Protein</p>
                      <p className="font-semibold text-sm">{recipe.protein}</p>
                    </div>
                    <div className="p-2 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground">Karbo</p>
                      <p className="font-semibold text-sm">{recipe.carbs}</p>
                    </div>
                    <div className="p-2 bg-secondary rounded-lg">
                      <p className="text-xs text-muted-foreground">Lemak</p>
                      <p className="font-semibold text-sm">{recipe.fat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <ChatbotButton />
    </div>
  )
}
