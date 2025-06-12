"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages, ArrowRight, Loader2, Globe } from "lucide-react"
import { useSession } from "next-auth/react"

// Language options for the dropdowns
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
]

export default function HomePage() {
  // State variables to manage the component
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showResult, setShowResult] = useState(false)

  // Get user session for authentication
  const { data: session } = useSession()

  // Hide welcome message after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  // Function to handle translation
  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    setShowResult(false)

    try {
      // Call our API route to handle translation
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          source: sourceLang,
          target: targetLang,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTranslatedText(data.translatedText)
        setShowResult(true)
      } else {
        alert(data.message || "Translation failed. Please try again.")
        console.error("Translation error:", data)
      }
    } catch (error) {
      console.error("Translation error:", error)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Function to swap languages
  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setInputText(translatedText)
    setTranslatedText(inputText)
  }

  return (
    <div className="min-h-screen poly-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        {showWelcome && (
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 poly-card px-8 py-4 rounded-full shadow-2xl animate-poly-glow">
              <Globe className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold text-lg">Welcome to Polyverse</span>
              <Globe className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        )}

        {/* Main Translation Interface */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold poly-text mb-6">Translate Anything</h1>
            <p className="text-gray-300 text-md font-medium">
              Break down language barriers with our simple, elegant translator
            </p>
          </div>

          <Card className="poly-card shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Languages className="h-8 w-8 text-blue-400" />
                Translation Studio
                <Languages className="h-8 w-8 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Language Selection */}
              <div className="flex items-center gap-6 justify-center">
                <div className="flex-1 max-w-xs">
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                    From
                  </label>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white h-12 text-lg font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-700">
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={swapLanguages}
                  className="mt-8 p-4 hover:bg-blue-900/30 rounded-full border border-blue-500/30 transition-all duration-300"
                >
                  <ArrowRight className="h-6 w-6 text-blue-400" />
                </Button>

                <div className="flex-1 max-w-xs">
                  <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">To</label>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white h-12 text-lg font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-700">
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Text Input and Output */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                    Enter text to translate
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your text here..."
                    className="min-h-28 bg-gray-800/50 border-gray-600 text-white text-base resize-none placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                    Translation
                  </label>
                  <div
                    className={`min-h-28 p-3 bg-gray-900/50 border border-gray-600 rounded-md transition-all duration-500 ${showResult ? "animate-fade-in" : ""}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                        <span className="ml-2 text-gray-300 text-base">Translating...</span>
                      </div>
                    ) : (
                      <p className="text-white text-base whitespace-pre-wrap leading-relaxed">
                        {translatedText || "Translation will appear here..."}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Translate Button */}
              <div className="text-center">
                <Button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isLoading}
                  className="poly-button px-12 py-4 text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-3" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Languages className="h-5 w-5 mr-3" />
                      Translate
                    </>
                  )}
                </Button>
              </div>

              {/* Login Prompt */}
              {/* {!session && (
                <div className="text-center p-6 bg-gradient-to-r from-blue-900/30 to-slate-900/30 rounded-xl border border-blue-500/30">
                  <p className="text-blue-200 text-lg">
                    <Globe className="inline h-5 w-5 mr-2 text-blue-400" />
                    <strong>Tip:</strong> Sign in to save your translation history and access it anytime!
                  </p>
                </div>
              )} */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
