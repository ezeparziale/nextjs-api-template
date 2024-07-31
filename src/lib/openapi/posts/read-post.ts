import { ZodOpenApiOperationObject } from "zod-openapi"

import { postOutputSchema, postPathParamSchema } from "@/schemas/posts"

import {
  badRequestErrorSchema,
  internalServerErrorSchema,
  notFoundErrorSchema,
  unauthorizedErrorSchema,
} from "../responses"

export const readPost: ZodOpenApiOperationObject = {
  operationId: "readPost",
  summary: "Read a post by ID",
  description: "Retrieve details of a specific post using its ID.",
  requestParams: { path: postPathParamSchema },
  responses: {
    "200": {
      description: "Read Post",
      content: { "application/json": { schema: postOutputSchema } },
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
