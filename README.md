# :rocket: Next.js API Template

A boilerplate template for building APIs with Next.js, featuring schema validation and
OpenAPI documentation.

- [x] API with basic operations: POST/GET/PUT/PATCH/DELETE
- [x] OpenAPI schema
- [x] Validation of request bodies with Zod
- [x] Validation of query parameters with Zod
- [x] OpenAPI schema generation with `zod-openapi`
- [x] Swagger docs
- [x] Token-based authorization

## :floppy_disk: Installation

1. Clone this repo:

```http
git clone https://github.com/ezeparziale/nextjs-api-template.git
```

2. Navigate to the project directory:

```bash
cd nextjs-api-template
```

3. Install dependencies:

```bash
npm i
```

4. Create a `.env` file by copying the `.env.template` file and updating it with your
   environment variables.

5. Run migrations to initialize the database:

```bash
npx prisma migrate deploy
```

6. Start the application:

```bash
npm run dev
```

7. Go to:

```http
http://localhost:3000
```

## :page_facing_up: API Docs

```http
http://localhost:3000/api/openapi
```

```http
http://localhost:3000/api/docs
```
