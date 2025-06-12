import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { text, source, target } = await request.json()

    console.log("Received input:", { text, source, target })

    if (!text || !source || !target) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Try multiple translation APIs as fallback
    let translatedText = ""

    try {
      // First try LibreTranslate (updated endpoint)
      const translateResponse = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: source,
          target: target,
          format: "text",
        }),
      })

      if (translateResponse.ok) {
        const translateData = await translateResponse.json()
        translatedText = translateData.translatedText
      } else {
        throw new Error("LibreTranslate failed")
      }
    } catch (libreError) {
      console.log("LibreTranslate failed, trying alternative...")

      // Fallback to MyMemory API (free, no key required)
      try {
        const myMemoryResponse = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`,
        )

        if (myMemoryResponse.ok) {
          const myMemoryData = await myMemoryResponse.json()
          if (myMemoryData.responseStatus === 200) {
            translatedText = myMemoryData.responseData.translatedText
          } else {
            throw new Error("MyMemory API failed")
          }
        } else {
          throw new Error("MyMemory API request failed")
        }
      } catch (myMemoryError) {
        console.error("All translation APIs failed:", { libreError, myMemoryError })
        return NextResponse.json(
          { success: false, message: "Translation service temporarily unavailable. Please try again later." },
          { status: 503 },
        )
      }
    }

    // Save to database if user is logged in
    const session = await getServerSession(authOptions)
    if (session?.user?.id) {
      try {
        const db = await getDatabase()
        await db.collection("translations").insertOne({
          userId: session.user.id,
          originalText: text,
          translatedText: translatedText,
          sourceLang: source,
          targetLang: target,
          createdAt: new Date(),
        })
        console.log("Translation saved to database")
      } catch (dbError) {
        console.error("Database save error:", dbError)
        // Continue even if database save fails
      }
    }

    return NextResponse.json({
      success: true,
      translatedText: translatedText,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Translation failed. Please try again.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
