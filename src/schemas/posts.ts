import * as z from "zod"
import "zod-openapi/extend"

const postId = z
  .number()
  .describe("The unique identifier of the post.")
  .openapi({ example: 1 })

export const postPathParamSchema = z.object({
  postId,
})

export const postSchema = z.object({
  id: postId,
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long." })
    .max(50, { message: "Title must be at most 50 characters long." })
    .describe("The title of the post.")
    .openapi({
      example: "My First Post",
    }),
  content: z.string().describe("The content of the post.").openapi({
    example: "This is the content of the post.",
  }),
  published: z.boolean().describe("Indicates if the post is published.").openapi({
    example: false,
  }),
})

export const postOutputSchema = z.object({ ...postSchema.shape })

export const postCreateSchema = postSchema.omit({ id: true }).extend({
  content: postSchema.shape.content.optional(),
  published: postSchema.shape.published.default(false),
})

export const postUpdateSchema = postSchema
  .omit({ id: true })
  .required({ content: true, published: true })

export const postUpdatePartialSchema = postSchema.omit({ id: true }).partial()
