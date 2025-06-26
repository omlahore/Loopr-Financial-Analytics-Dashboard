# Loopr Financial Analytics Dashboard

## Project Overview
Loopr is a full-stack financial analytics dashboard with a React frontend and a Node.js/Express/TypeScript backend, using MongoDB for data storage. It provides user authentication, transaction management, and analytics features.

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the Repository
```
git clone https://github.com/omlahore/Loopr-Financial-Analytics-Dashboard.git
cd Loopr-Financial-Analytics-Dashboard
```

### 2. Backend Setup
```
cd backend
cp .env.example .env   # Create your .env file if not present
npm install
```

Edit `.env` and set:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=4000
```

#### Build and Run Backend
```
npm run build
npm start
```

#### Seed the Database
```
npm run seed
```

### 3. Frontend Setup
```
cd ../frontend
cp .env.example .env   # Create your .env file if not present
npm install
```

Edit `.env` and set:
```
REACT_APP_API_BASE_URL=http://localhost:4000
```

#### Run Frontend
```
npm start
```

---

## Usage Examples

- Register a new user or log in with the default admin:
  - Email: admin@example.com
  - Password: password123
- View, search, and filter transactions
- Export transactions as CSV
- View analytics and summary on the dashboard

---

# API Documentation

## Authentication

### POST `/auth/register`
- Register a new user
- Body: `{ "email": string, "password": string, "name": string }`
- Response: `{ token, user }`

### POST `/auth/login`
- Log in a user
- Body: `{ "email": string, "password": string }`
- Response: `{ token, user }`

### GET `/auth/me`
- Get current user info (requires Authorization header)
- Response: `{ id, email, name, role }`

---

## Transactions

### GET `/transactions`
- List transactions (supports filters)
- Query params: `page`, `limit`, `search`, `status`, `category`, `user`, `dateFrom`, `dateTo`, `amountMin`, `amountMax`
- Response: `{ data: Transaction[], total: number }`

### GET `/transactions/summary`
- Get summary analytics
- Response: `{ totalRevenue, totalExpenses, net, numTransactions, monthlyTrend, categoryBreakdown }`

### GET `/transactions/export`
- Export transactions as CSV
- Query params: same as `/transactions`, plus `columns`
- Response: CSV file

---

## Transaction Object Example
```
{
  "id": "...",
  "date": "2024-05-20T12:00:00.000Z",
  "amount": 1200.00,
  "category": "Revenue",
  "status": "Paid",
  "user_id": "...",
  "user_profile": "John Doe"
}
```

---

## License
MIT
