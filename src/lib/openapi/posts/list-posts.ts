import * as z from "zod"
import { ZodOpenApiOperationObject } from "zod-openapi"

import { listQuerySchema } from "@/schemas/api"
import { postOutputSchema } from "@/schemas/posts"

import { internalServerErrorSchema, unauthorizedErrorSchema } from "../responses"

export const listPosts: ZodOpenApiOperationObject = {
  operationId: "listPosts",
  summary: "List posts",
  description:
    "Retrieve a list of posts with optional pagination, search capabilities.",
  requestParams: {
    query: listQuerySchema,
  },
  responses: {
    "200": {
      description: "List Posts",
      content: { "application/json": { schema: z.array(postOutputSchema) } },
    },
    "401": {
      description: "Unauthorized Error",
      content: {
        "application/json": {
          schema: unauthorizedErrorSchema,
        },
      },
    },
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: internalServerErrorSchema,
        },
      },
    },
  },
  tags: ["Posts"],
  security: [{ ApiKey: [] }],
}
