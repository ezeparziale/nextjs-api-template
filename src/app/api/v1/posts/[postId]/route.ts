import prismadb from "@/lib/prismadb"
import { postUpdatePartialSchema, postUpdateSchema } from "@/schemas/posts"
import { Prisma } from "@prisma/client"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

// Get a post by id
export async function GET(_req: Request, { params }: { params: { postId: string } }) {
  try {
    // Check API key
    const headersList = headers()
    const xApiKey = headersList.get("X-API-KEY")

    if (xApiKey !== process.env.X_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check postId
    const postId = params.postId
    const id = parseInt(postId)

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID supplied" }, { status: 400 })
    }

    // Get post by id
    const data = await prismadb.post.findFirstOrThrow({
      where: { id },
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Post not found" }, { status: 404 })
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

// Delete a post by id
export async function DELETE(
  _req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    // Check API key
    const headersList = headers()
    const xApiKey = headersList.get("X-API-KEY")

    if (xApiKey !== process.env.X_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check postId
    const postId = params.postId
    const id = parseInt(postId)

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID supplied" }, { status: 400 })
    }

    // Delete post by id
    await prismadb.post.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error:", error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Post not found" }, { status: 404 })
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

// Update a post by id
export async function PUT(req: Request, { params }: { params: { postId: string } }) {
  try {
    // Check API key
    const headersList = headers()
    const xApiKey = headersList.get("X-API-KEY")

    if (xApiKey !== process.env.X_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check postId
    const postId = params.postId
    const id = parseInt(postId)

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID supplied" }, { status: 400 })
    }

    // Check type method
    const isPartial = req.method === "PATCH"

    // Check body schema
    const bodyRaw = await req.json()
    const schema = isPartial ? postUpdatePartialSchema : postUpdateSchema
    const validatedFields = schema.safeParse(bodyRaw)

    if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors
      return Response.json({ errors }, { status: 422 })
    }

    // Update post by id
    const { title, content, published } = validatedFields.data

    const data = await prismadb.post.update({
      where: { id },
      data: { title, content, published },
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Post not found" }, { status: 404 })
      }
    }
    if (error instanceof SyntaxError) {
      console.error("JSON Syntax Error:", error.message)
      return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

// Update a post by id
export const PATCH = PUT
