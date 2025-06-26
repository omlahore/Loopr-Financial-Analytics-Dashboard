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
const { PORT = 4000, MONGODB_URI = '' } = process.env;
app.use((0, cors_1.default)());
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
        console.log(`Listening on http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
});
