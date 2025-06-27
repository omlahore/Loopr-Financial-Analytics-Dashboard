# 🚀 Loopr Financial Analytics Dashboard

[![Deploy on Render](https://img.shields.io/badge/Deploy%20on-Render-3f51b5?logo=render&logoColor=white&style=for-the-badge)](https://render.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white&style=for-the-badge)](https://www.mongodb.com/atlas)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org/)

---

## 🌟 Project Overview

**Loopr** is a full-stack financial analytics dashboard for modern teams and individuals. It features:
- **User authentication** (JWT-based)
- **Transaction management** (CRUD, search, filter, export)
- **Analytics dashboard** (revenue, expenses, net, trends)
- **Responsive, modern UI** (React + MUI + Tailwind)
- **RESTful API** (Node.js, Express, TypeScript)
- **MongoDB Atlas** for cloud data storage

---

## ✨ Features

- 🔐 **Secure Auth:** Register, login, and manage users with JWT
- 💸 **Transactions:** Add, view, filter, and export transactions
- 📊 **Analytics:** Visualize revenue, expenses, and trends
- 📁 **CSV Export:** Download filtered transactions as CSV
- 🔎 **Search & Filter:** Powerful search, date, status, and category filters
- 🧑‍💼 **User Roles:** Admin and user support (extensible)
- ⚡ **Fast & Responsive:** Built with React, MUI, and Tailwind CSS

---

## 🛠️ Tech Stack

| Frontend         | Backend                | Database      | Other         |
|-----------------|------------------------|---------------|--------------|
| React 19        | Node.js 18+            | MongoDB Atlas | TypeScript   |
| MUI (Material)  | Express.js             |               | JWT Auth     |
| Tailwind CSS    | TypeScript             |               | Chart.js     |
| Axios           | CORS                   |               | Recharts     |

---

## 🚦 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/omlahore/Loopr-Financial-Analytics-Dashboard.git
cd Loopr-Financial-Analytics-Dashboard
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Set your environment variables in Render or in a `.env` file:
```env
MONGODB_URI=mongodb+srv://loopr-admin:Loopr2024!@cluster0.0d6bxom.mongodb.net/loopr-db?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret
PORT=4000
```
Build and run:
```bash
npm run build
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Set your API base URL in `.env` (for local dev):
```env
REACT_APP_API_BASE_URL=http://localhost:4000
```
Run the frontend:
```bash
npm start
```

---

## 🧑‍💻 Usage

- **Register** a new user or **login** with:
  - Email: `admin@example.com`
  - Password: `password123`
- **Dashboard:** View analytics, summary, and recent transactions
- **Transactions:** Search, filter, and export your data
- **Wallet & Analytics:** Visualize your financial health

---

## 📚 API Endpoints

### 🔑 Authentication
- **POST `/auth/register`** — Register a new user
- **POST `/auth/login`** — Login and receive JWT
- **GET `/auth/me`** — Get current user info (requires JWT)

### 💸 Transactions
- **GET `/transactions`** — List/filter transactions
- **GET `/transactions/summary`** — Get analytics summary
- **GET `/transactions/export`** — Export transactions as CSV

#### Example Transaction Object
```json
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

## 🔗 Useful Links

- [Live Demo (Frontend)](https://loopr.omlahore.com)
- [Backend API (Render)](https://loopr-financial-analytics-dashboard.onrender.com)
- [MongoDB Atlas](https://cloud.mongodb.com/)
- [Project Repo](https://github.com/omlahore/Loopr-Financial-Analytics-Dashboard)

---

## 📜 License

MIT
