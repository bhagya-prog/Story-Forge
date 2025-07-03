import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

export interface FaceRecord {
  name: string
  dateAdded: string
  imageUrl: string
}

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), "data", "face_database.csv")
    const csvContent = fs.readFileSync(csvPath, "utf-8")

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    })

    const faces: FaceRecord[] = records.map((record: any) => ({
      name: record.Name || record.name,
      dateAdded: record["Date Added"] || record.dateAdded,
      imageUrl: record["Image URL"] || record.imageUrl,
    }))

    return NextResponse.json({ faces, total: faces.length })
  } catch (error) {
    console.error("Error reading face database:", error)
    return NextResponse.json({ error: "Failed to load face database" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, imageUrl } = await request.json()

    // In a real app, you'd save to a database
    // For now, we'll just return success
    const newFace: FaceRecord = {
      name,
      dateAdded: new Date().toISOString().split("T")[0],
      imageUrl: imageUrl || "/placeholder.svg?height=80&width=80",
    }

    return NextResponse.json({ success: true, face: newFace })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add face" }, { status: 500 })
  }
}
