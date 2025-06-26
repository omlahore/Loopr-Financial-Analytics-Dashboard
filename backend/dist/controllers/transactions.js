"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportTransactions = exports.getSummary = void 0;
const Transaction_1 = require("../models/Transaction");
const json2csv_1 = require("json2csv");
const getSummary = async (_req, res) => {
    try {
        const transactions = await Transaction_1.Transaction.find();
        // Summary metrics
        const totalRevenue = transactions.filter(t => t.category === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.category === 'Expense').reduce((sum, t) => sum + t.amount, 0);
        const net = totalRevenue - totalExpenses;
        const numTransactions = transactions.length;
        // Revenue vs Expenses trend (by month)
        const monthly = {};
        transactions.forEach(t => {
            const month = new Date(t.date).toLocaleString('default', { year: 'numeric', month: 'short' });
            if (!monthly[month])
                monthly[month] = { revenue: 0, expense: 0 };
            if (t.category === 'Revenue')
                monthly[month].revenue += t.amount;
            if (t.category === 'Expense')
                monthly[month].expense += t.amount;
        });
        const monthlyTrend = Object.entries(monthly).map(([month, data]) => ({ month, ...data }));
        // Category breakdown
        const categoryBreakdown = transactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});
        res.json({
            totalRevenue,
            totalExpenses,
            net,
            numTransactions,
            monthlyTrend,
            categoryBreakdown
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get summary' });
    }
};
exports.getSummary = getSummary;
const exportTransactions = async (req, res) => {
    try {
        const { status, category, search, sortBy = 'date', sortDir = 'desc', columns } = req.query;
        const filter = {};
        if (status)
            filter.status = status;
        if (category)
            filter.category = category;
        if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [
                { user_profile: regex },
                { status: regex },
                { category: regex },
                { amount: isNaN(Number(search)) ? undefined : Number(search) }
            ].filter(Boolean);
        }
        const sortObj = { [sortBy]: sortDir === 'asc' ? 1 : -1 };
        const transactions = await Transaction_1.Transaction.find(filter).sort(sortObj);
        let fields = ['id', 'date', 'amount', 'category', 'status', 'user_id', 'user_profile'];
        if (columns) {
            const requested = columns.split(',').map(f => f.trim()).filter(Boolean);
            // Only allow valid fields
            fields = fields.filter(f => requested.includes(f));
        }
        const parser = new json2csv_1.Parser({ fields });
        const csv = parser.parse(transactions.map(t => ({ ...t.toObject(), date: t.date.toISOString() })));
        res.header('Content-Type', 'text/csv');
        res.attachment('transactions.csv');
        res.send(csv);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to export transactions' });
    }
};
exports.exportTransactions = exportTransactions;
