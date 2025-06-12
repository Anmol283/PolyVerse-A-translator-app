"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, Languages, Calendar, Trash2, Loader2, Globe, User } from "lucide-react"

interface Translation {
  _id: string
  originalText: string
  translatedText: string
  sourceLang: string
  targetLang: string
  createdAt: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [translations, setTranslations] = useState<Translation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
      return
    }
  }, [session, status, router])

  // Fetch user's translation history
  useEffect(() => {
    if (session) {
      fetchTranslations()
    }
  }, [session])

  const fetchTranslations = async () => {
    try {
      const response = await fetch("/api/translations")
      const data = await response.json()

      if (data.success) {
        setTranslations(data.translations)
      }
    } catch (error) {
      console.error("Error fetching translations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTranslation = async (id: string) => {
    try {
      const response = await fetch(`/api/translations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTranslations(translations.filter((t) => t._id !== id))
      }
    } catch (error) {
      console.error("Error deleting translation:", error)
    }
  }

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
      ar: "Arabic",
      hi: "Hindi",
    }
    return languages[code] || code
  }

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen poly-gradient flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen poly-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <Card className="poly-card shadow-2xl border-0 mb-8">
            <CardHeader className="pb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 poly-button rounded-full flex items-center justify-center animate-poly-glow">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl poly-text mb-2">Welcome back, {session.user?.name}!</CardTitle>
                  <p className="text-gray-300 text-lg">{session.user?.email}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-400 font-semibold">Polyverse Member</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Translation History */}
          <Card className="poly-card shadow-2xl border-0">
            <CardHeader className="pb-8">
              <div className="flex items-center gap-4">
                <History className="h-8 w-8 text-blue-400" />
                <CardTitle className="text-2xl text-white">Translation History</CardTitle>
                <Badge variant="secondary" className="ml-auto bg-blue-900/50 text-blue-200 text-lg px-4 py-2">
                  {translations.length} translations
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Loading your translations...</p>
                </div>
              ) : translations.length === 0 ? (
                <div className="text-center py-12">
                  <Languages className="h-16 w-16 text-gray-500 mx-auto mb-6" />
                  <p className="text-gray-300 text-xl mb-3">No translations yet</p>
                  <p className="text-gray-500">Start translating to build your history!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {translations.map((translation) => (
                    <div
                      key={translation._id}
                      className="p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-blue-500/50 text-blue-300 px-3 py-1">
                            {getLanguageName(translation.sourceLang)} → {getLanguageName(translation.targetLang)}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4" />
                            {new Date(translation.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTranslation(translation._id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            Original ({getLanguageName(translation.sourceLang)})
                          </p>
                          <p className="text-white text-lg leading-relaxed">{translation.originalText}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            Translation ({getLanguageName(translation.targetLang)})
                          </p>
                          <p className="text-blue-200 text-lg leading-relaxed">{translation.translatedText}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
