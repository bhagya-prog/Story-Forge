import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { forkName, isPrivate } = await request.json()

    // In a real app, you'd create a fork in the database
    return NextResponse.json({
      success: true,
      message: `Story ${id} forked as "${forkName}"`,
      forkId: `${id}-fork-${Date.now()}`,
      isPrivate,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fork story" }, { status: 500 })
  }
}
