import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In a real app, you'd update the database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: `Story ${id} liked successfully`,
      newLikeCount: Math.floor(Math.random() * 1000) + 100,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to like story" }, { status: 500 })
  }
}
