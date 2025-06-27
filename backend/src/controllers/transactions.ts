import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { Parser } from 'json2csv';

export const getSummary = async (_req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();

    // Summary metrics
    const totalRevenue = transactions.filter(t => t.category === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.category === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const net = totalRevenue - totalExpenses;
    const numTransactions = transactions.length;

    // Revenue vs Expenses trend (by month)
    const monthly = {} as Record<string, { revenue: number; expense: number }>;
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { year: 'numeric', month: 'short' });
      if (!monthly[month]) monthly[month] = { revenue: 0, expense: 0 };
      if (t.category === 'Revenue') monthly[month].revenue += t.amount;
      if (t.category === 'Expense') monthly[month].expense += t.amount;
    });
    const monthlyTrend = Object.entries(monthly).map(([month, data]) => ({ month, ...data }));

    // Category breakdown
    const categoryBreakdown = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      totalRevenue,
      totalExpenses,
      net,
      numTransactions,
      monthlyTrend,
      categoryBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get summary' });
  }
};

export const exportTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      status, 
      category, 
      search, 
      sortBy = 'date', 
      sortDir = 'desc', 
      columns,
      dateFrom,
      dateTo,
      amountMin,
      amountMax,
      user
    } = req.query;
    
    const filter: any = {};
    if (status)   filter.status   = status;
    if (category) filter.category = category;
    if (user)     filter.user_profile = user;
    
    // Date range filter
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom as string);
      if (dateTo) filter.date.$lte = new Date(dateTo as string);
    }
    
    // Amount range filter
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
    
    const sortObj: any = { [sortBy as string]: sortDir === 'asc' ? 1 : -1 };
    const transactions = await Transaction.find(filter).sort(sortObj);
    let fields = ['id', 'date', 'amount', 'category', 'status', 'user_id', 'user_profile'];
    if (columns) {
      const requested = (columns as string).split(',').map(f => f.trim()).filter(Boolean);
      // Only allow valid fields
      fields = fields.filter(f => requested.includes(f));
    }
    const parser = new Parser({ fields });
    const csv = parser.parse(transactions.map(t => ({ ...t.toObject(), date: t.date.toISOString() })));
    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to export transactions' });
  }
}; 