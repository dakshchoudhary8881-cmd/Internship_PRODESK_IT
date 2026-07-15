# Game Waitlist CRUD API with Route Parameters

A production-quality REST API built with Node.js and Express.js for managing gaming arcade player waitlists. This API replaces traditional paper registers and Excel sheets with a modern, digital solution that any frontend application can consume.

---

## Features

- Full CRUD operations (Create, Read, Update, Delete)
- Route Parameters for single-resource operations
- Input validation with express-validator
- XSS sanitization on all text inputs
- Search and filter by game, status, or player name
- Sort results by name, id, or creation date
- Consistent JSON response format
- Comprehensive error handling (400, 404, 500)
- Malformed JSON detection
- Security hardening with Helmet and CORS
- Request logging with Morgan
- Simulated network delay (300–500ms)
- Analytics logging on every mutation
- Environment-based configuration with dotenv
- Auto-generated UUIDs for every entry

---

## Folder Structure

```
Client_Delivery_3/
│
├── config/
│   └── index.js
│
├── controllers/
│   └── waitlistController.js
│
├── data/
│   └── waitlistData.js
│
├── middleware/
│   ├── errorHandler.js
│   ├── notFound.js
│   └── validation.js
│
├── models/
│   └── waitlistModel.js
│
├── routes/
│   └── waitlistRoutes.js
│
├── utils/
│   ├── analytics.js
│   ├── delay.js
│   └── sanitizer.js
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── README.md
└── server.js
```

---

## Installation

```bash
git clone <repository-url>
cd Client_Delivery_3
npm install
```

---

## How to Run

### Development (with auto-restart)

```bash
npm run dev
```

### Production

```bash
npm start
```

The server starts at **http://localhost:5000** by default.

---

## Scripts

| Script          | Command           | Description                          |
| --------------- | ----------------- | ------------------------------------ |
| `npm start`     | `node server.js`  | Start the server in production mode  |
| `npm run dev`   | `nodemon server.js` | Start with auto-restart on changes |

---

## API Endpoints

| Method   | Endpoint               | Description                     |
| -------- | ---------------------- | ------------------------------- |
| `GET`    | `/api/waitlist`        | Retrieve all waitlist entries   |
| `GET`    | `/api/waitlist/:id`    | Retrieve a single entry by ID  |
| `POST`   | `/api/waitlist`        | Add a new player to waitlist   |
| `PUT`    | `/api/waitlist/:id`    | Update an existing entry by ID |
| `DELETE` | `/api/waitlist/:id`    | Remove an entry by ID          |

### Query Parameters

| Parameter | Example                              | Description              |
| --------- | ------------------------------------ | ------------------------ |
| `game`    | `/api/waitlist?game=Bowling`         | Filter by game name      |
| `status`  | `/api/waitlist?status=waiting`       | Filter by status         |
| `name`    | `/api/waitlist?name=daksh`           | Search by player name    |
| `sort`    | `/api/waitlist?sort=name`            | Sort by name, id, or createdAt |

---

## Request and Response Examples

### GET /api/waitlist — Get All Players

**Response (200)**

```json
{
  "success": true,
  "message": "Waitlist entries retrieved successfully",
  "count": 3,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Daksh Choudhary",
      "game": "Bowling",
      "players": 4,
      "phone": "9876543210",
      "status": "waiting",
      "createdAt": "2026-07-14T17:00:00.000Z",
      "updatedAt": "2026-07-14T17:00:00.000Z"
    }
  ]
}
```

---

### GET /api/waitlist/:id — Get Single Player

**Response (200)**

```json
{
  "success": true,
  "message": "Waitlist entry retrieved successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Daksh Choudhary",
    "game": "Bowling",
    "players": 4,
    "phone": "9876543210",
    "status": "waiting",
    "createdAt": "2026-07-14T17:00:00.000Z",
    "updatedAt": "2026-07-14T17:00:00.000Z"
  }
}
```

**Response (404)**

```json
{
  "success": false,
  "message": "Waitlist entry not found"
}
```

---

### POST /api/waitlist — Add New Player

**Request Body**

```json
{
  "name": "Amit Kumar",
  "game": "Laser Tag",
  "players": 5,
  "phone": "9123456789",
  "status": "waiting"
}
```

**Response (201)**

```json
{
  "success": true,
  "message": "Player added to waitlist successfully",
  "data": {
    "id": "generated-uuid",
    "name": "Amit Kumar",
    "game": "Laser Tag",
    "players": 5,
    "phone": "9123456789",
    "status": "waiting",
    "createdAt": "2026-07-14T17:05:00.000Z",
    "updatedAt": "2026-07-14T17:05:00.000Z"
  }
}
```

---

### PUT /api/waitlist/:id — Update Player

**Request Body (partial update)**

```json
{
  "status": "playing",
  "players": 6
}
```

**Response (200)**

```json
{
  "success": true,
  "message": "Player updated successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Daksh Choudhary",
    "game": "Bowling",
    "players": 6,
    "phone": "9876543210",
    "status": "playing",
    "createdAt": "2026-07-14T17:00:00.000Z",
    "updatedAt": "2026-07-14T17:10:00.000Z"
  }
}
```

---

### DELETE /api/waitlist/:id — Delete Player

**Response (200)**

```json
{
  "success": true,
  "message": "Player removed successfully"
}
```

---

## Validation Rules

| Field     | Rules                                              |
| --------- | -------------------------------------------------- |
| `name`    | Required, 3–50 characters, cannot be only numbers  |
| `game`    | Required, minimum 2 characters                     |
| `players` | Required, integer, 1–20                            |
| `phone`   | Required, exactly 10 digits                        |
| `status`  | Optional, must be: waiting, playing, or completed  |

**Validation Error Response (400)**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name must be at least 3 characters"
    },
    {
      "field": "phone",
      "message": "Phone must be exactly 10 digits"
    }
  ]
}
```

---

## Error Responses

| Status | Scenario                    | Message                                   |
| ------ | --------------------------- | ----------------------------------------- |
| 400    | Missing required fields     | Validation failed                         |
| 400    | Invalid phone format        | Phone must be exactly 10 digits           |
| 400    | Players out of range        | Players must be an integer between 1 and 20 |
| 400    | Invalid status value        | Status must be one of: waiting, playing, completed |
| 400    | Malformed JSON body         | Malformed JSON in request body            |
| 400    | No valid fields for update  | No valid fields provided for update       |
| 404    | Entry not found             | Waitlist entry not found                  |
| 404    | Unknown route               | Route GET /unknown not found              |
| 500    | Server error                | Internal Server Error                     |

---

## Thunder Client / Postman Testing

### GET All Players
```
GET http://localhost:5000/api/waitlist
```

### GET Player by ID
```
GET http://localhost:5000/api/waitlist/<paste-id-here>
```

### GET with Filters
```
GET http://localhost:5000/api/waitlist?game=Bowling
GET http://localhost:5000/api/waitlist?status=waiting
GET http://localhost:5000/api/waitlist?name=daksh
GET http://localhost:5000/api/waitlist?sort=name
```

### POST — Create Player
```
POST http://localhost:5000/api/waitlist
Content-Type: application/json

{
  "name": "Sneha Patel",
  "game": "Air Hockey",
  "players": 2,
  "phone": "9988776655",
  "status": "waiting"
}
```

### PUT — Update Player
```
PUT http://localhost:5000/api/waitlist/<paste-id-here>
Content-Type: application/json

{
  "status": "playing"
}
```

### DELETE — Remove Player
```
DELETE http://localhost:5000/api/waitlist/<paste-id-here>
```

### Test 404 — Invalid ID
```
GET http://localhost:5000/api/waitlist/nonexistent-id
```

### Test 400 — Empty Body
```
POST http://localhost:5000/api/waitlist
Content-Type: application/json

{}
```

### Test 400 — Invalid Data
```
POST http://localhost:5000/api/waitlist
Content-Type: application/json

{
  "name": "AB",
  "game": "B",
  "players": 25,
  "phone": "123",
  "status": "invalid"
}
```

### Test 404 — Unknown Route
```
GET http://localhost:5000/api/unknown
```

---

## Project Architecture

```
Request
  │
  ├── Helmet (Security Headers)
  ├── CORS (Cross-Origin Policy)
  ├── Morgan (Request Logging)
  ├── JSON Parser (Body Parsing)
  │
  ├── Routes (waitlistRoutes.js)
  │     ├── Validation Middleware (validation.js)
  │     └── Controller (waitlistController.js)
  │           ├── Sanitizer (sanitizer.js)
  │           ├── Model (waitlistModel.js)
  │           │     └── Data Store (waitlistData.js)
  │           ├── Analytics (analytics.js)
  │           └── Delay (delay.js)
  │
  ├── 404 Handler (notFound.js)
  └── Error Handler (errorHandler.js)
```

---

## Future Improvements

- Database integration (MongoDB / PostgreSQL)
- JWT-based authentication and authorization
- Rate limiting middleware
- Pagination for large datasets
- WebSocket support for real-time waitlist updates
- Swagger / OpenAPI documentation
- Automated test suite (Jest / Supertest)
- Docker containerization
- CI/CD pipeline integration

---

## Author

**Daksh Choudhary**

---

## License

This project is licensed under the **MIT License**.
