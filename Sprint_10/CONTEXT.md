# ============================================
# Sprint 10 — Context File
# ============================================
# This file provides context for AI assistants
# working on this project. It documents the
# architecture, conventions, and key decisions.
# ============================================

## Project: The Data Hub v2

## Sprint: 10 — MongoDB Atlas Migration (P0–P3 Complete)

## Status: COMPLETE

---

## Architecture

- **Pattern**: MVC (Model → View → Controller)
- **Entry Point**: `server.js` (loads env, connects DB, starts server)
- **App Config**: `app.js` (middleware, routes, error handling)
- **Database**: MongoDB Atlas via Mongoose ODM
- **Deployment**: Vercel (serverless via `vercel.json`)

---

## Key Design Decisions

1. **app.js / server.js separation** — `app.js` exports the configured Express app without starting a server. `server.js` handles environment loading, database connection, and HTTP listening. This makes the app testable and Vercel-compatible.

2. **asyncHandler wrapper** — Instead of try/catch in every controller, all async handlers are wrapped with `asyncHandler()` which catches rejected promises and forwards them to Express's error middleware.

3. **Centralized error handler** — `middleware/errorHandler.js` maps Mongoose-specific errors (CastError, ValidationError, duplicate key code 11000) to proper HTTP status codes. Error responses include both `message` and `error` fields.

4. **ApiFeatures class** — Encapsulates filter, search, sort, and paginate logic into a chainable builder. Controllers call it as: `new ApiFeatures(query, req.query).filter().search().sort().paginate()`.

5. **Soft delete** — Posts are never permanently deleted. The `isDeleted` flag and `deletedAt` timestamp allow recovery via the restore endpoint.

6. **Slug generation** — Post titles are automatically slugified in a pre-save hook with a timestamp suffix to guarantee uniqueness.

7. **Reading time** — Calculated automatically from word count (200 wpm average) in the pre-save hook.

8. **Password exclusion** — The User schema sets `select: false` on the password field, and controllers manually strip it from responses.

9. **User roles** — The User schema includes a `role` field with enum `["user", "admin"]`, defaulting to `"user"`.

10. **Referential integrity** — Users cannot be deleted if they have active (non-deleted) posts. Post create/update endpoints verify the author exists before proceeding.

11. **Standalone analytics routes** — Stats, top categories, and top authors are mounted at dedicated paths (`/api/stats`, `/api/categories/top`, `/api/authors/top`) instead of being nested under `/api/posts`.

12. **PATCH for likes** — The like endpoint uses PATCH (not PUT) since it's a partial update (incrementing a counter), following REST conventions.

13. **Combined health check** — `/api/health` returns both server status and database status in a single response, along with uptime and timestamp.

---

## File Inventory

| File | Purpose |
|------|---------|
| `config/db.js` | MongoDB Atlas connection |
| `models/User.js` | User schema (name, email, password, avatar, role) |
| `models/Post.js` | Post schema (title, content, category, tags, slug, readingTime, soft delete) |
| `middleware/asyncHandler.js` | Promise rejection catcher |
| `middleware/errorHandler.js` | Centralized error → HTTP response mapper |
| `middleware/validateObjectId.js` | Route-level ObjectId validator |
| `validators/postValidator.js` | express-validator chains for posts |
| `validators/userValidator.js` | express-validator chains for users (includes role) |
| `utils/ApiFeatures.js` | Chainable query builder |
| `controllers/postController.js` | Post CRUD + analytics handlers |
| `controllers/userController.js` | User CRUD |
| `routes/postRoutes.js` | Post route mappings |
| `routes/userRoutes.js` | User route mappings |
| `routes/statsRoutes.js` | GET /api/stats |
| `routes/categoryRoutes.js` | GET /api/categories/top |
| `routes/authorRoutes.js` | GET /api/authors/top |
| `app.js` | Express app config (middleware + routes) |
| `server.js` | Entry point (env + DB + listen) |
| `vercel.json` | Vercel deployment config |
| `.env.example` | Environment variable template |
| `README.md` | Full project documentation |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGO_URI` | Yes | — | MongoDB Atlas connection string |
| `PORT` | No | `5000` | HTTP server port |
| `NODE_ENV` | No | `development` | `development` or `production` |

---

## API Endpoints Summary

### Posts: `/api/posts`
- `POST /` — Create post
- `GET /` — Get all (filter, search, sort, paginate)
- `GET /recent` — Latest 3 posts
- `GET /:id` — Get by ID
- `PUT /:id` — Update
- `DELETE /:id` — Soft delete
- `PUT /:id/restore` — Restore
- `PATCH /:id/like` — Like (increment)

### Users: `/api/users`
- `POST /` — Create user
- `GET /` — Get all (paginated)
- `GET /:id` — Get by ID (with posts)
- `PUT /:id` — Update
- `DELETE /:id` — Delete

### Analytics
- `GET /api/stats` — Database statistics
- `GET /api/categories/top` — Top 5 categories
- `GET /api/authors/top` — Top 5 authors

### System
- `GET /` — API status
- `GET /api` — API index
- `GET /api/health` — Server + Database health

---

## Sprint Phases

| Phase | What it covers |
|-------|----------------|
| P0 | MongoDB connection, models, schemas, env config |
| P1 | Replace mock arrays with Mongoose CRUD |
| P2 | populate(), search, filter, sort, pagination, recent |
| P3 | Soft delete, slug, readingTime, like, stats, categories, authors, health |

---

## Dependencies

```
compression, cors, dotenv, express, express-validator,
helmet, mongoose, morgan, slugify
```

## Dev Dependencies

```
nodemon
```

---

## Next Steps (Future Sprints)

- JWT authentication
- Role-based access control
- Image uploads (Cloudinary)
- Comment system
- Unit tests (Jest + Supertest)
- Rate limiting
- Swagger docs
