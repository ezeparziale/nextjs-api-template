import { ZodOpenApiPathsObject } from "zod-openapi"

import { createPost } from "./create-post"
import { deletePost } from "./delete-post"
import { listPosts } from "./list-posts"
import { readPost } from "./read-post"
import { updatePartialPost, updatePost } from "./update-post"

export const postsPaths: ZodOpenApiPathsObject = {
  "/api/v1/posts": {
    get: listPosts,
    post: createPost,
  },
  "/api/v1/posts/{postId}": {
    get: readPost,
    delete: deletePost,
    patch: updatePartialPost,
    put: updatePost,
  },
}
