"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const { PORT = 4000, MONGODB_URI } = process.env;
// Check for required environment variables
if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is required');
    process.exit(1);
}
// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        const allowedOrigins = [
            'https://loopr-financial-analytics-dashboard.onrender.com', // Production domain
            'http://localhost:3000', // React dev server
            'http://localhost:3001', // Alternative React port
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            'https://loopr.omlahore.com', // Your custom domain (HTTPS)
            'http://loopr.omlahore.com', // Your custom domain (HTTP)
        ];
        console.log('CORS request from origin:', origin);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Health check
app.get('/', (_req, res) => {
    res.send('🚀 Backend is live');
});
// Auth API
app.use('/auth', auth_1.default);
// Transactions API
app.use('/transactions', transactions_1.default);
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Connected to MongoDB`);
    });
})
    .catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
});
