# Penta Financial Analytics Dashboard

A full-stack financial analytics dashboard for managing, tracking, and visualizing financial data.

---

## Live Project Links

<div align="center">
  <a href="https://loopr.omlahore.com" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Frontend-Visit%20Penta-0a9396?style=for-the-badge" />
  </a>
  <a href="https://loopr-financial-analytics-dashboard.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Backend-View%20API-264653?style=for-the-badge" />
  </a>
</div>

---

## Project Overview

Penta is a modern full-stack financial analytics dashboard built with scalability and usability in mind. It provides:

- User authentication using JWT
- Transaction management (CRUD, search, filter, export)
- Interactive analytics dashboard with charts and trends
- Responsive UI using React, MUI, and Tailwind CSS
- RESTful API built with Node.js, Express, and TypeScript
- Cloud data storage via MongoDB Atlas

---

## Features

- Secure user authentication (JWT-based)
- Add, view, filter, and export financial transactions
- Real-time analytics of income, expenses, and net balance
- Export filtered data as CSV
- User roles (admin and standard user)
- Fully responsive UI optimized for all devices

---

## Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/1be9b4d9-824d-4b4f-bbb5-79d9acd5c336" width="300" />
  <img src="https://github.com/user-attachments/assets/548df88a-8d68-4088-b4fc-66c0da9db245" width="300" />
  <img src="https://github.com/user-attachments/assets/3c0cc899-e877-4f2f-afe6-1c34fde0e4ed" width="300" />
  <img src="https://github.com/user-attachments/assets/0cd41b17-8b45-4078-8014-fa7a093dc579" width="300" />
  <img src="https://github.com/user-attachments/assets/d440e326-dcac-4d46-8da3-14aedb5627de" width="300" />
  <img src="https://github.com/user-attachments/assets/fc3d2aa6-d859-4330-861a-8939b1ace56f" width="300" />
  <img src="https://github.com/user-attachments/assets/6979fbec-9185-4674-bf83-be14c642cf2a" width="300" />
  <img src="https://github.com/user-attachments/assets/c8782eb8-395d-4a69-8443-5636ec5b5810" width="300" />
</div>

---

## Tech Stack

| Frontend         | Backend                | Database      | Other         |
|------------------|------------------------|---------------|---------------|
| React 19         | Node.js 18+            | MongoDB Atlas | TypeScript    |
| MUI (Material UI)| Express.js             |               | JWT Auth      |
| Tailwind CSS     | TypeScript             |               | Chart.js      |
| Axios            | CORS                   |               | Recharts      |

---

## Quick Start

### 1. Clone the Repository

git clone https://github.com/omlahore/Loopr-Financial-Analytics-Dashboard.git  
cd Loopr-Financial-Analytics-Dashboard

### 2. Backend Setup

cd backend  
npm install

Create a .env file or set variables in your deployment environment:

MONGODB_URI=mongodb+srv://loopr-admin:Loopr2024!@cluster0.0d6bxom.mongodb.net/loopr-db?retryWrites=true&w=majority  
JWT_SECRET=your-jwt-secret  
PORT=4000

Build and start:

npm run build  
npm start

### 3. Frontend Setup

cd ../frontend  
npm install

Set your API base URL in .env:

REACT_APP_API_BASE_URL=http://localhost:4000

Start the frontend:

npm start

---

## Usage

- Register a new user or login using:
  - Email: admin@example.com
  - Password: password123
- View dashboard analytics
- Add, search, and export transactions
- View financial trends and summaries

---

## API Endpoints

### Authentication

POST /auth/register — Register a new user  
POST /auth/login — Login and receive JWT  
GET /auth/me — Retrieve current user info (JWT required)

### Transactions

GET /transactions — List and filter transactions  
GET /transactions/summary — View financial summary  
GET /transactions/export — Export transactions as CSV

Example transaction object:

{
  "id": "...",
  "date": "2024-05-20T12:00:00.000Z",
  "amount": 1200.00,
  "category": "Revenue",
  "status": "Paid",
  "user_id": "...",
  "user_profile": "John Doe"
}

---

## License

MIT
