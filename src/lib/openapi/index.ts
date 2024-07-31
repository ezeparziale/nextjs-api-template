import { createDocument } from "zod-openapi"

import {
  postCreateSchema,
  postOutputSchema,
  postUpdatePartialSchema,
  postUpdateSchema,
} from "@/schemas/posts"

import { postsPaths } from "./posts"

export const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Next.js API template",
    description: `[/api/v1/openapi](${process.env.SERVER_URL!}/api/openapi)`,
    version: "0.0.1",
    contact: { name: "@ezeparziale" },
  },
  servers: [
    {
      url: process.env.SERVER_URL!,
      description: process.env.NODE_ENV === "production" ? "Production API" : "Dev API",
    },
  ],
  paths: { ...postsPaths },
  components: {
    schemas: {
      postOutputSchema,
      postCreateSchema,
      postUpdatePartialSchema,
      postUpdateSchema,
    },
    securitySchemes: {
      ApiKey: {
        type: "apiKey",
        in: "header",
        name: "X-API-KEY",
        description: "Provide your API key in the X-API-KEY header.",
      },
    },
  },
  security: [{ BearerAuth: [] }],
})
