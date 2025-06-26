"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    user_id: { type: String, required: true },
    user_profile: { type: String, required: true }
});
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
