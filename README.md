# RoastFlow Roastery

A deployment-ready MERN coffee roastery storefront with:

- Coffee-first branding across the entire storefront
- Catalog support for arabica beans, robusta beans, espresso machines, grinders, AeroPress gear, and subscriptions
- AI flavor matching, dynamic pricing insights, and smart replenishment
- A floating product concierge chatbot powered by Ollama-compatible chat calls
- Admin product management, PayPal checkout, reviews, favorites, and profile-based recommendations

## Highlights

- Coffee artwork system for consistent product visuals even when the catalog has mixed image sources
- Redesigned home, shop, cart, product, checkout, and order flows for a premium roastery experience
- Profile-aware concierge chat endpoint at `POST /api/intelligence/concierge`
- Existing recommendation logic reused so chatbot suggestions stay grounded in actual store inventory
- Deployment-safe fix for the frontend catalog route on case-sensitive hosts

## Stack

### Frontend

- React + Vite
- Tailwind CSS
- Redux Toolkit + RTK Query
- Framer Motion

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT auth with cookies
- PayPal
- Ollama-compatible chat integration

## Environment

Copy `example-env.env` to `.env` and fill in the values you need.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
PAYPAL_CLIENT_ID=your_paypal_client_id

# Optional AI services
RECOMMENDER_SERVICE_URL=
OLLAMA_API_URL=https://ollama.com/api
OLLAMA_API_KEY=your_ollama_api_key
OLLAMA_MODEL=gpt-oss:20b
OLLAMA_TIMEOUT_MS=20000

# Worker settings
AUTH_RATE_LIMIT_MAX=20
DB_CONNECT_RETRIES=5
DB_RETRY_DELAY_MS=5000
INTELLIGENCE_WORKER_INTERVAL_MS=900000
```

If `OLLAMA_API_KEY` is not configured, the concierge still returns grounded fallback recommendations using in-app scoring.

## Local Development

```bash
npm install
npm install --prefix frontend
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Seed Data

To load the coffee-focused demo catalog:

```bash
node backend/utils/seeder.js
```

Seeded data includes:

- Arabica bean offerings
- A robusta espresso option
- Espresso machine and grinder products
- AeroPress-compatible manual brew gear
- Subscription inventory

## Production Build

```bash
npm run build --prefix frontend
```

The backend already serves `frontend/dist` in production mode.

## Deploy Notes

- Set `NODE_ENV=production`
- Point `MONGO_URI` at your production database
- Set `CLIENT_URL` and `ALLOWED_ORIGINS` to your deployed frontend origin
- Provide `PAYPAL_CLIENT_ID` for checkout
- Provide `OLLAMA_API_KEY` and keep `OLLAMA_API_URL=https://ollama.com/api` if you want the hosted Ollama concierge flow
- If you prefer a self-hosted/local Ollama instance, change `OLLAMA_API_URL` to that host and choose a model available there

## Default Seed Login

- Admin: `admin@example.com` / `123456`
- Customer: `lina@example.com` / `123456`
