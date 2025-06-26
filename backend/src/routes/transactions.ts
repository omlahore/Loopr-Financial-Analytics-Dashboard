import { Router } from 'express';
import { Transaction } from '../models/Transaction';
import { getSummary, exportTransactions } from '../controllers/transactions';
import { auth } from '../middleware/auth';
import { Parser } from 'json2csv';

const router = Router();

// Apply authentication middleware to all routes
router.use(auth);

// GET /transactions?page=1&limit=20&status=Paid&category=Revenue&search=foo&sortBy=amount&sortDir=asc
router.get('/', async (req, res) => {
  try {
    const { page = '1', limit = '20', status, category, search, sortBy = 'date', sortDir = 'desc', dateFrom, dateTo, amountMin, amountMax, user } = req.query;
    const filter: any = {};
    if (status)   filter.status   = status;
    if (category) filter.category = category;
    if (user) filter.user_profile = user;
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom as string);
      if (dateTo)   filter.date.$lte = new Date(dateTo as string);
    }
    if (amountMin || amountMax) {
      filter.amount = {};
      if (amountMin) filter.amount.$gte = Number(amountMin);
      if (amountMax) filter.amount.$lte = Number(amountMax);
    }
    if (search) {
      const regex = new RegExp(search as string, 'i');
      filter.$or = [
        { user_profile: regex },
        { status: regex },
        { category: regex },
        { amount: isNaN(Number(search)) ? undefined : Number(search) }
      ].filter(Boolean);
    }

    const pageNum  = parseInt(page as string,   10);
    const limitNum = parseInt(limit as string, 10);
    const skip     = (pageNum - 1) * limitNum;
    const sortObj: any = { [sortBy as string]: sortDir === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      Transaction.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum),
      Transaction.countDocuments(filter)
    ]);

    res.json({ data, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// GET /transactions/export?status=Paid&category=Revenue&search=foo&sortBy=amount&sortDir=asc
router.get('/export', exportTransactions);

// GET /transactions/summary
router.get('/summary', getSummary);

export default router;
