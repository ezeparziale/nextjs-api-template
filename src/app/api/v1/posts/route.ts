import prismadb from "@/lib/prismadb"
import { listQuerySchema } from "@/schemas/api"
import { postCreateSchema } from "@/schemas/posts"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

// Get all posts
export async function GET(req: Request) {
  try {
    // Check API key
    const headersList = headers()
    const xApiKey = headersList.get("X-API-KEY")

    if (xApiKey !== process.env.X_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get query params
    const { searchParams } = new URL(req.url)
    const query = Object.fromEntries(searchParams.entries())

    const { page, limit, q } = listQuerySchema.parse(query)
    const offset = (page - 1) * limit

    // Get posts
    const data = await prismadb.post.findMany({
      where: { title: { contains: q } },
      skip: offset,
      take: limit,
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

// Create a post
export async function POST(req: Request) {
  try {
    // Check API key
    const headersList = headers()
    const xApiKey = headersList.get("X-API-KEY")

    if (xApiKey !== process.env.X_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check body schema
    const bodyRaw = await req.json()
    const validatedFields = postCreateSchema.safeParse(bodyRaw)

    if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors
      return Response.json({ errors }, { status: 422 })
    }

    // Create new post
    const { title, content, published } = validatedFields.data

    const data = await prismadb.post.create({
      data: { title, content, published },
    })

    return NextResponse.json({ ...data }, { status: 201 })
  } catch (error) {
    console.error("Error:", error)
    if (error instanceof SyntaxError) {
      console.error("JSON Syntax Error:", error.message)
      return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
