# Express Products API

This project is a sample Express.js RESTful API implementing CRUD operations for a "products" resource with middleware, validation, and error handling.

Requirements
- Node.js v18+

Install

```bash
npm install
```

Run

```bash
# development with nodemon
npm run dev

# or
npm start
```

Environment

Copy `.env.example` to `.env` and set your API_KEY and PORT if desired.

API Overview

Base URL: http://localhost:3000

Headers
- X-API-KEY: required for all /api routes (default in .env.example)

Endpoints

- GET / => Hello World
- GET /api/products => List products, supports query params: category, page, limit
- GET /api/products/:id => Get a product
- POST /api/products => Create product (name:string, price:number, description?, category?, inStock?:boolean)
- PUT /api/products/:id => Update product
- DELETE /api/products/:id => Delete product
- GET /api/products/search?q=term => Search products by name
- GET /api/products/stats => Get product statistics (count by category)

