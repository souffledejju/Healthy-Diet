"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    targetWeight: "",
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleNext = () => {
    if (step === 1 && formData.age && formData.weight && formData.height) {
      setStep(2)
    } else if (step === 2 && formData.targetWeight) {
      // Save onboarding data
      localStorage.setItem("onboardingComplete", "true")
      localStorage.setItem("userData", JSON.stringify(formData))
      router.push("/dashboard")
    }
  }

  const progress = (step / 2) * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div>
              <CardTitle className="text-2xl">{step === 1 ? "Informasi Dasar" : "Target Anda"}</CardTitle>
              <CardDescription>
                {step === 1 ? "Bantu kami mengenal Anda lebih baik" : "Tentukan target berat badan ideal Anda"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Umur (tahun)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Berat Badan (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Tinggi Badan (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Data Anda</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{formData.age}</p>
                    <p className="text-xs text-muted-foreground">tahun</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{formData.weight}</p>
                    <p className="text-xs text-muted-foreground">kg</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{formData.height}</p>
                    <p className="text-xs text-muted-foreground">cm</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetWeight">Berat Badan Ideal (kg)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  placeholder="65"
                  value={formData.targetWeight}
                  onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Target yang realistis membantu Anda mencapai hasil yang berkelanjutan
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-3 mt-6">
            {step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-11">
                Kembali
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={step === 1 ? !formData.age || !formData.weight || !formData.height : !formData.targetWeight}
              className="flex-1 h-11"
            >
              {step === 1 ? "Lanjut" : "Mulai"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
