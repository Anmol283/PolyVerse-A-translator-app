import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const result = await db.collection("translations").deleteOne({
      _id: new ObjectId(params.id),
      userId: session.user.id, // Ensure user can only delete their own translations
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Translation not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Translation deleted successfully",
    })
  } catch (error) {
    console.error("Delete translation error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete translation" }, { status: 500 })
  }
}
