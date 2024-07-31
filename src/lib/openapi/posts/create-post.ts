import { ZodOpenApiOperationObject } from "zod-openapi"

import { postCreateSchema, postOutputSchema } from "@/schemas/posts"

import {
  internalServerErrorSchema,
  unauthorizedErrorSchema,
  validationErrorSchema,
} from "../responses"

export const createPost: ZodOpenApiOperationObject = {
  operationId: "createPost",
  summary: "Create a post",
  description: "Create a new post in the system.",
  requestBody: {
    content: {
      "application/json": {
        schema: postCreateSchema,
      },
    },
  },
  responses: {
    "201": {
      description: "Post created",
      content: { "application/json": { schema: postOutputSchema } },
    },
    "401": {
      description: "Unauthorized Error",
      content: {
        "application/json": {
          schema: unauthorizedErrorSchema,
        },
      },
    },
    "422": {
      description: "Validation Error",
      content: {
        "application/json": {
          schema: validationErrorSchema,
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
