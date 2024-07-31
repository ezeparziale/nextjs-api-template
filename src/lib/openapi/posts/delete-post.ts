import { ZodOpenApiOperationObject } from "zod-openapi"

import { postPathParamSchema } from "@/schemas/posts"

import {
  badRequestErrorSchema,
  internalServerErrorSchema,
  notFoundErrorSchema,
  unauthorizedErrorSchema,
} from "../responses"

export const deletePost: ZodOpenApiOperationObject = {
  operationId: "deletePost",
  summary: "Delete a post by ID",
  description: "Deletes a specific post from the system.",
  requestParams: { path: postPathParamSchema },
  responses: {
    "204": {
      description: "Post deleted",
    },
    "400": {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: badRequestErrorSchema,
          example: {
            message: "Invalid ID supplied",
          },
        },
      },
    },
    "401": {
      description: "Unauthorized Error",
      content: {
        "application/json": {
          schema: unauthorizedErrorSchema,
        },
      },
    },
    "404": {
      description: "Not Found",
      content: {
        "application/json": {
          schema: notFoundErrorSchema,
          example: {
            message: "Post not found.",
          },
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
