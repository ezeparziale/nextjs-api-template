import { ZodOpenApiOperationObject } from "zod-openapi"

import {
  postOutputSchema,
  postPathParamSchema,
  postUpdatePartialSchema,
  postUpdateSchema,
} from "@/schemas/posts"

import {
  badRequestErrorSchema,
  internalServerErrorSchema,
  notFoundErrorSchema,
  unauthorizedErrorSchema,
  validationErrorSchema,
} from "../responses"

export const updatePost: ZodOpenApiOperationObject = {
  operationId: "updatePost",
  summary: "Update a post by ID",
  description:
    "Update the details of an existing post. This operation allows for updating all the fields of the post.",
  requestParams: { path: postPathParamSchema },
  requestBody: {
    content: {
      "application/json": {
        schema: postUpdateSchema,
      },
    },
  },
  responses: {
    "200": {
      description: "Post updated",
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

export const updatePartialPost: ZodOpenApiOperationObject = {
  operationId: "updatePartialPost",
  summary: "Partially update a post by ID",
  description:
    "Partially update the details of an existing post. This operation allows for updating one or more fields of the post without requiring all fields to be provided, enabling more flexible updates.",
  requestParams: { path: postPathParamSchema },
  requestBody: {
    content: {
      "application/json": {
        schema: postUpdatePartialSchema,
      },
    },
  },
  responses: {
    "200": {
      description: "Post updated",
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
