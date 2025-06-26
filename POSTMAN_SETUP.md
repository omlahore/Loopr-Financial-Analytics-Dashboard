# 📊 Loopr Financial Analytics Dashboard - Postman Collection

This guide will help you set up and use the Postman collection for testing the Loopr Financial Analytics Dashboard API.

## 🚀 Quick Start

### 1. Import the Collection
1. Open Postman
2. Click **Import** button
3. Select the `Loopr-Financial-Analytics-Dashboard.postman_collection.json` file
4. The collection will be imported with all endpoints ready to use

### 2. Set Up Environment Variables
1. In Postman, click on the **Environments** tab
2. Create a new environment called "Loopr Dashboard"
3. Add the following variables:

| Variable | Initial Value | Description |
|----------|---------------|-------------|
| `baseUrl` | `http://localhost:4000` | Base URL for local development |
| `token` | (leave empty) | JWT token (auto-set after login) |
| `userId` | (leave empty) | User ID (auto-set after login) |

**For Production:**
- Change `baseUrl` to your deployed backend URL (e.g., `https://your-backend.onrender.com`)

### 3. Start Testing
1. Select your environment from the dropdown
2. Start with the **Health Check** to verify the API is running
3. Use **Login User** to authenticate (token will be auto-set)
4. Test other endpoints with authentication

## 🔐 Authentication Flow

### Step 1: Login
1. Use the **"Login User"** request
2. The response will automatically set the `token` and `userId` variables
3. You can now use authenticated endpoints

### Step 2: Test Protected Endpoints
- All transaction endpoints require the JWT token
- The token is automatically included in the Authorization header
- If you get a 401 error, re-run the login request

## 📋 Available Endpoints

### Authentication
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login and get JWT token
- **GET** `/auth/me` - Get current user profile

### Transactions
- **GET** `/transactions` - Get all transactions with pagination
- **GET** `/transactions/summary` - Get transaction analytics
- **GET** `/transactions/export` - Export transactions to CSV

### Health Check
- **GET** `/` - Check if backend is running

## 🔍 Query Parameters

### Transaction Filters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number for pagination | `1` |
| `limit` | number | Items per page | `20` |
| `status` | string | Filter by status | `Paid`, `Pending` |
| `category` | string | Filter by category | `Revenue`, `Expense` |
| `search` | string | Search in multiple fields | `income` |
| `dateFrom` | date | Start date (YYYY-MM-DD) | `2024-01-01` |
| `dateTo` | date | End date (YYYY-MM-DD) | `2024-12-31` |
| `amountMin` | number | Minimum amount | `100` |
| `amountMax` | number | Maximum amount | `10000` |
| `sortBy` | string | Sort field | `date`, `amount`, `user_profile` |
| `sortDir` | string | Sort direction | `asc`, `desc` |

## 📊 Example Requests

### Get Recent Transactions
```
GET {{baseUrl}}/transactions?page=1&limit=10&sortBy=date&sortDir=desc
```

### Get Revenue Transactions
```
GET {{baseUrl}}/transactions?category=Revenue&status=Paid&sortBy=amount&sortDir=desc
```

### Search Transactions
```
GET {{baseUrl}}/transactions?search=income&dateFrom=2024-01-01&dateTo=2024-12-31
```

### Export Filtered Data
```
GET {{baseUrl}}/transactions/export?status=Paid&category=Revenue&sortBy=date&sortDir=desc
```

## 🛠️ Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Run the **Login User** request first
   - Check if the token is set in environment variables
   - Verify the token hasn't expired

2. **404 Not Found**
   - Check if the backend server is running
   - Verify the `baseUrl` is correct
   - Try the **Health Check** endpoint

3. **500 Internal Server Error**
   - Check backend logs for detailed error messages
   - Verify database connection
   - Check if required environment variables are set

### Environment Setup

**Local Development:**
```bash
# Start the backend
cd backend
npm install
npm run dev
```

**Production:**
- Update `baseUrl` to your deployed backend URL
- Ensure CORS is properly configured
- Verify all environment variables are set

## 📝 Response Examples

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@loopr.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### Transactions Response
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user_profile": "John Doe",
      "amount": 1500,
      "status": "Paid",
      "category": "Revenue",
      "date": "2024-01-15T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "pages": 5
}
```

### Summary Response
```json
{
  "totalRevenue": 50000,
  "totalExpenses": 30000,
  "netIncome": 20000,
  "transactionCount": 150,
  "monthlyData": [...],
  "categoryBreakdown": [...]
}
```

## 🔗 Useful Links

- [Postman Documentation](https://learning.postman.com/)
- [JWT Token Debugger](https://jwt.io/)
- [API Testing Best Practices](https://www.postman.com/collection/guides/)

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify your backend is running correctly
3. Check the backend logs for detailed error messages
4. Ensure all environment variables are properly configured

---

**Happy Testing! 🎉** 