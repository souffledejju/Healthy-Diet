"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, LogOut, Save } from "lucide-react"
import { ChatbotButton } from "@/components/ui/chatbot-button"

export default function ProfilePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [userData, setUserData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    const data = localStorage.getItem("userData")

    if (userEmail) setEmail(userEmail)
    if (data) setUserData(JSON.parse(data))
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const handleSave = () => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData))
      setIsEditing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">Profile</h1>
            <p className="text-muted-foreground">Kelola informasi akun dan pengaturan Anda</p>
          </div>

          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
              <CardDescription>Detail akun dan kontak Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{email?.split("@")[0]}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Body Metrics */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Data Tubuh</CardTitle>
                <CardDescription>Informasi fisik Anda</CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  Edit
                </Button>
              ) : (
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Simpan
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Umur (tahun)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={userData?.age || ""}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    disabled={!isEditing}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Tinggi Badan (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={userData?.height || ""}
                    onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                    disabled={!isEditing}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Berat Badan (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={userData?.weight || ""}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    disabled={!isEditing}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Berat Badan Ideal (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    value={userData?.targetWeight || ""}
                    onChange={(e) => setUserData({ ...userData, targetWeight: e.target.value })}
                    disabled={!isEditing}
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Kelola preferensi akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start h-11 bg-transparent">
                Ubah Password
              </Button>
              <Button variant="outline" className="w-full justify-start h-11 bg-transparent">
                Notifikasi
              </Button>
              <Button variant="outline" className="w-full justify-start h-11 bg-transparent">
                Privasi & Keamanan
              </Button>
              <Button variant="destructive" className="w-full justify-start h-11 gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatbotButton />
    </div>
  )
}
