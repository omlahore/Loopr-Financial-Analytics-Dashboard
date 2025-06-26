import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/transactions';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// @ts-ignore
import uniqBy from 'lodash/uniqBy';
import clsx from 'clsx';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6384'];

const AnalyticsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateStart, setDateStart] = useState<Dayjs | null>(dayjs('2020-01-01'));
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    setLoading(true);
    fetchTransactions({
      dateFrom: dateStart ? dayjs(dateStart).toISOString() : undefined,
      dateTo: dateEnd ? dayjs(dateEnd).toISOString() : undefined,
      limit: 1000
    })
      .then(res => setTransactions(res.data.data))
      .finally(() => setLoading(false));
  }, [dateStart, dateEnd]);

  // Compute analytics from filtered transactions
  const summary = React.useMemo(() => {
    if (!transactions.length) return null;
    const totalRevenue = transactions.filter(t => t.category === 'Revenue').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.category === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const net = totalRevenue - totalExpenses;
    const numTransactions = transactions.length;
    const categoryBreakdown = transactions.reduce((acc: any, t: any) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    return { totalRevenue, totalExpenses, net, numTransactions, categoryBreakdown };
  }, [transactions]);

  // Compute top categories and users
  const topCategories = React.useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);
  const topUsers = React.useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach(t => {
      map[t.user_profile] = (map[t.user_profile] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);
  // Trend analysis (daily)
  const trendData = React.useMemo(() => {
    const map: Record<string, { revenue: number; expense: number }> = {};
    transactions.forEach(t => {
      const day = dayjs(t.date).format('YYYY-MM-DD');
      if (!map[day]) map[day] = { revenue: 0, expense: 0 };
      if (t.category === 'Revenue') map[day].revenue += t.amount;
      if (t.category === 'Expense') map[day].expense += t.amount;
    });
    return Object.entries(map)
      .map(([date, d]) => ({ date, ...d }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions]);

  // Unique users and categories for filters
  const userOptions = React.useMemo(() => uniqBy(transactions, 'user_profile').map((t: any) => t.user_profile), [transactions]);
  const categoryOptions = React.useMemo(() => uniqBy(transactions, 'category').map((t: any) => t.category), [transactions]);
  const [user, setUser] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  // Filtered transactions
  const filteredTx = React.useMemo(() => transactions.filter(t =>
    (!user || t.user_profile === user) &&
    (!category || t.category === category) &&
    (!status || t.status === status) &&
    (!amountMin || t.amount >= parseFloat(amountMin)) &&
    (!amountMax || t.amount <= parseFloat(amountMax))
  ), [transactions, user, category, status, amountMin, amountMax]);

  // Skeleton loader components
  const SkeletonCard = () => (
    <div className="bg-bg-card rounded-xl p-6 flex flex-col items-center shadow-md animate-pulse">
      <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
      <div className="h-8 w-32 bg-gray-700 rounded" />
    </div>
  );
  const SkeletonChart = () => (
    <div className="h-64 bg-bg-main rounded-lg flex items-center justify-center animate-pulse">
      <div className="w-2/3 h-32 bg-gray-700 rounded" />
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <div className="text-2xl font-bold flex-1 bg-gray-700 h-8 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <SkeletonChart />
        <SkeletonChart />
        <SkeletonChart />
        <SkeletonChart />
      </div>
    );
  }
  if (!summary) {
    return <div className="flex justify-center items-center min-h-[50vh] text-yellow-500">No data for selected range.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        <div className="text-2xl font-bold flex-1 tracking-tight bg-gradient-to-r from-accent-green to-accent-yellow bg-clip-text text-transparent drop-shadow-lg">Analytics</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={dateStart}
            onChange={setDateStart}
            maxDate={dateEnd ?? undefined}
            slotProps={{ textField: { size: 'small' } }}
          />
          <DatePicker
            label="End Date"
            value={dateEnd}
            onChange={setDateEnd}
            minDate={dateStart ?? undefined}
            slotProps={{ textField: { size: 'small' } }}
          />
        </LocalizationProvider>
      </div>
      {/* Advanced Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-4 bg-bg-card rounded-xl p-4 shadow-sm">
        <select value={user} onChange={e => setUser(e.target.value)} className="px-3 py-2 rounded bg-bg-main border border-border-dark text-text-main focus:ring-2 focus:ring-accent-green">
          <option value="">All Users</option>
          {userOptions.map((u: string) => <option key={u} value={u}>{u}</option>)}
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 rounded bg-bg-main border border-border-dark text-text-main focus:ring-2 focus:ring-accent-green">
          <option value="">All Categories</option>
          {categoryOptions.map((c: string) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2 rounded bg-bg-main border border-border-dark text-text-main focus:ring-2 focus:ring-accent-green">
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <input type="number" value={amountMin} onChange={e => setAmountMin(e.target.value)} placeholder="Min Amount" className="px-3 py-2 rounded bg-bg-main border border-border-dark text-text-main w-28 focus:ring-2 focus:ring-accent-green" />
        <input type="number" value={amountMax} onChange={e => setAmountMax(e.target.value)} placeholder="Max Amount" className="px-3 py-2 rounded bg-bg-main border border-border-dark text-text-main w-28 focus:ring-2 focus:ring-accent-green" />
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 rounded-xl p-6 flex flex-col items-center shadow-md border border-accent-green/20">
          <div className="text-sm text-text-muted font-medium">Total Revenue</div>
          <div className="text-2xl font-bold text-accent-green drop-shadow">${summary.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-br from-accent-yellow/10 to-accent-green/10 rounded-xl p-6 flex flex-col items-center shadow-md border border-accent-yellow/20">
          <div className="text-sm text-text-muted font-medium">Total Expenses</div>
          <div className="text-2xl font-bold text-accent-yellow drop-shadow">${summary.totalExpenses.toLocaleString()}</div>
        </div>
        <div className={clsx("rounded-xl p-6 flex flex-col items-center shadow-md border", summary.net >= 0 ? "bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 border-accent-green/20" : "bg-gradient-to-br from-accent-yellow/10 to-accent-green/10 border-accent-yellow/20") }>
          <div className="text-sm text-text-muted font-medium">Net</div>
          <div className={clsx("text-2xl font-bold drop-shadow", summary.net >= 0 ? "text-accent-green" : "text-accent-yellow")}>${summary.net.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 rounded-xl p-6 flex flex-col items-center shadow-md border border-accent-green/20">
          <div className="text-sm text-text-muted font-medium">Transactions</div>
          <div className="text-2xl font-bold text-accent-green drop-shadow">{summary.numTransactions}</div>
        </div>
      </div>
      {/* Category Breakdown Pie Chart */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md">
        <div className="text-lg font-semibold mb-4">Category Breakdown</div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={Object.entries(summary.categoryBreakdown).map(([name, value]) => ({ name, value }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {Object.keys(summary.categoryBreakdown).map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Top Categories List */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md">
        <div className="text-lg font-semibold mb-4">Top Categories</div>
        <ul className="divide-y divide-border-dark">
          {topCategories.map((cat, i) => (
            <li key={cat.name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-green/10 text-accent-green">
                  <CategoryIcon fontSize="small" />
                </span>
                <span className="font-medium text-text-main">{cat.name}</span>
              </div>
              <span className="font-bold text-accent-green">${cat.value.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Top Users List */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md">
        <div className="text-lg font-semibold mb-4">Top Users</div>
        <ul className="divide-y divide-border-dark">
          {topUsers.map((user, i) => (
            <li key={user.name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <img src={'https://randomuser.me/api/portraits/men/32.jpg'} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-accent-green/30" />
                <span className="font-medium text-text-main">{user.name}</span>
              </div>
              <span className="font-bold text-accent-green">${user.value.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Trend Analysis Line Chart */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md">
        <div className="text-lg font-semibold mb-4">Trend Analysis (Daily)</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData} margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#22e584" name="Revenue" />
            <Bar dataKey="expense" fill="#f6c945" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* More analytics features will be added here */}
    </div>
  );
};

export default AnalyticsPage; 