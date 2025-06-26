"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Transaction_1 = require("../models/Transaction");
const transactions_1 = require("../controllers/transactions");
const router = (0, express_1.Router)();
// GET /transactions?page=1&limit=20&status=Paid&category=Revenue&search=foo&sortBy=amount&sortDir=asc
router.get('/', async (req, res) => {
    try {
        const { page = '1', limit = '20', status, category, search, sortBy = 'date', sortDir = 'desc', dateFrom, dateTo, amountMin, amountMax, user } = req.query;
        const filter = {};
        if (status)
            filter.status = status;
        if (category)
            filter.category = category;
        if (user)
            filter.user_profile = user;
        if (dateFrom || dateTo) {
            filter.date = {};
            if (dateFrom)
                filter.date.$gte = new Date(dateFrom);
            if (dateTo)
                filter.date.$lte = new Date(dateTo);
        }
        if (amountMin || amountMax) {
            filter.amount = {};
            if (amountMin)
                filter.amount.$gte = Number(amountMin);
            if (amountMax)
                filter.amount.$lte = Number(amountMax);
        }
        if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [
                { user_profile: regex },
                { status: regex },
                { category: regex },
                { amount: isNaN(Number(search)) ? undefined : Number(search) }
            ].filter(Boolean);
        }
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;
        const sortObj = { [sortBy]: sortDir === 'asc' ? 1 : -1 };
        const [data, total] = await Promise.all([
            Transaction_1.Transaction.find(filter)
                .sort(sortObj)
                .skip(skip)
                .limit(limitNum),
            Transaction_1.Transaction.countDocuments(filter)
        ]);
        res.json({ data, total, page: pageNum, pages: Math.ceil(total / limitNum) });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});
// GET /transactions/export?status=Paid&category=Revenue&search=foo&sortBy=amount&sortDir=asc
router.get('/export', transactions_1.exportTransactions);
// GET /transactions/summary
router.get('/summary', transactions_1.getSummary);
exports.default = router;
