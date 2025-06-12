import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const translations = await db
      .collection("translations")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      translations: translations,
    })
  } catch (error) {
    console.error("Fetch translations error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch translations" }, { status: 500 })
  }
}
