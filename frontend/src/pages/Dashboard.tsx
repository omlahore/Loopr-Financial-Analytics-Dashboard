import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { fetchSummary, fetchTransactions } from '../api/transactions';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from 'recharts';
import { Line as LineChartJS } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend as ChartLegend,
} from 'chart.js';
import { statusChip } from '../components/StatusChip';
import { formatDateWithDay } from '../utils/dateUtils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ChartLegend);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6384'];

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>(recent);
  const [overviewView, setOverviewView] = useState<'Monthly' | 'Weekly'>('Monthly');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchSummary().then(res => res.data),
      fetchTransactions({ limit: 3, sortBy: 'date', sortDir: 'desc' }).then(res => res.data.data)
    ])
      .then(([summaryData, recentTx]) => {
        setSummary(summaryData);
        setRecent(recentTx);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load dashboard data');
        setLoading(false);
      });
  }, []);

  // Compute weekly trend from monthlyTrend if needed
  const getWeeklyTrend = () => {
    if (!summary || !summary.monthlyTrend) return [];
    // Group by week (ISO week)
    const weekMap: Record<string, { revenue: number; expense: number }> = {};
    summary.monthlyTrend.forEach((d: any) => {
      // Parse month string to date, then get week number
      const date = new Date(d.month + ' 1, 2024');
      const week = `${date.getFullYear()}-W${Math.ceil((date.getDate() + ((date.getDay() + 6) % 7)) / 7)}`;
      if (!weekMap[week]) weekMap[week] = { revenue: 0, expense: 0 };
      weekMap[week].revenue += d.revenue;
      weekMap[week].expense += d.expense;
    });
    return Object.entries(weekMap).map(([week, data]) => ({ week, ...data }));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() === '') {
        setFilteredTransactions(recent);
      } else {
        fetchTransactions({ search, limit: 10 })
          .then(res => setFilteredTransactions(res.data.data))
          .catch(() => setFilteredTransactions([]));
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [search, recent]);

  // Skeleton loader components
  const SkeletonCard = () => (
    <div className="bg-bg-card rounded-xl p-6 flex items-center gap-4 shadow-md animate-pulse">
      <div className="w-12 h-12 rounded-lg bg-gray-700" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-24 bg-gray-700 rounded" />
        <div className="h-6 w-32 bg-gray-700 rounded" />
      </div>
    </div>
  );
  const SkeletonChart = () => (
    <div className="h-64 bg-bg-main rounded-lg flex items-center justify-center animate-pulse">
      <div className="w-2/3 h-32 bg-gray-700 rounded" />
    </div>
  );
  const SkeletonTable = () => (
    <div className="overflow-x-auto animate-pulse">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-text-muted text-sm">
            <th className="py-2 px-4 font-medium">Name</th>
            <th className="py-2 px-4 font-medium">Date</th>
            <th className="py-2 px-4 font-medium">Amount</th>
            <th className="py-2 px-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t border-border-dark">
              <td className="py-3 px-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700" />
                <span className="h-4 w-24 bg-gray-700 rounded block" />
              </td>
              <td className="py-3 px-4"><span className="h-4 w-20 bg-gray-700 rounded block" /></td>
              <td className="py-3 px-4"><span className="h-4 w-16 bg-gray-700 rounded block" /></td>
              <td className="py-3 px-4"><span className="h-4 w-16 bg-gray-700 rounded block" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-8 bg-bg-main min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/5 w-full bg-bg-card rounded-xl p-6 shadow-md">
            <SkeletonChart />
          </div>
          <div className="lg:w-2/5 w-full flex flex-col gap-8">
            <div className="bg-bg-card rounded-xl p-6 shadow-md h-full flex flex-col">
              <SkeletonTable />
            </div>
          </div>
        </div>
        <div className="bg-bg-card rounded-xl p-6 shadow-md mt-4">
          <SkeletonTable />
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-[50vh] text-red-500">Error: {error}</div>;
  }
  if (!summary) {
    return <div className="flex justify-center items-center min-h-[50vh] text-yellow-500">No summary data loaded.</div>;
  }

  const cards = [
    { label: 'Balance', value: summary.totalRevenue - summary.totalExpenses, icon: '/balance.png', color: 'accent-green' },
    { label: 'Revenue', value: summary.totalRevenue, icon: '/revenue.png', color: 'accent-green' },
    { label: 'Expenses', value: summary.totalExpenses, icon: '/expenses.png', color: 'accent-yellow' },
    { label: 'Net', value: summary.net, icon: '/savings.png', color: summary.net >= 0 ? 'accent-green' : 'accent-yellow' },
  ];

  // Chart data selection
  const chartLabels = overviewView === 'Monthly'
    ? summary.monthlyTrend.map((d: any) => d.month)
    : getWeeklyTrend().map((d: any) => d.week);
  const chartRevenue = overviewView === 'Monthly'
    ? summary.monthlyTrend.map((d: any) => d.revenue)
    : getWeeklyTrend().map((d: any) => d.revenue);
  const chartExpense = overviewView === 'Monthly'
    ? summary.monthlyTrend.map((d: any) => d.expense)
    : getWeeklyTrend().map((d: any) => d.expense);

  return (
    <div className="flex flex-col gap-8">
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <div key={card.label} className="bg-bg-card rounded-xl p-6 flex items-center gap-4 shadow-md">
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-opacity-10 bg-${card.color}`}> 
              <img src={card.icon} alt={card.label + ' icon'} className="w-12 h-12 object-contain" />
            </div>
            <div>
              <div className="text-sm text-text-muted font-medium">{card.label}</div>
              <div className={`text-2xl font-bold text-${card.color}`}>${card.value.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Overview + Recent Transactions Row */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Overview Chart (60%) */}
        <div className="lg:w-3/5 w-full bg-bg-card rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">Overview</div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-accent-green"><span className="w-3 h-3 rounded-full bg-accent-green inline-block"></span>Income</span>
              <span className="flex items-center gap-1 text-accent-yellow"><span className="w-3 h-3 rounded-full bg-accent-yellow inline-block"></span>Expenses</span>
              <select
                className="bg-bg-main text-text-main rounded px-2 py-1 border border-border-dark ml-4"
                value={overviewView}
                onChange={e => setOverviewView(e.target.value as 'Monthly' | 'Weekly')}
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
          <div className="h-64 bg-bg-main rounded-lg">
            <LineChartJS
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    label: 'Income',
                    data: chartRevenue,
                    borderColor: '#22e584',
                    backgroundColor: 'rgba(34,229,132,0.1)',
                    pointBackgroundColor: '#22e584',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#22e584',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 3,
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                  },
                  {
                    label: 'Expenses',
                    data: chartExpense,
                    borderColor: '#f6c945',
                    backgroundColor: 'rgba(246,201,69,0.1)',
                    pointBackgroundColor: '#f6c945',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#f6c945',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 3,
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1000,
                  easing: 'easeInOutQuart',
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(35, 39, 51, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#22e584',
                    borderWidth: 2,
                    padding: 16,
                    cornerRadius: 12,
                    caretSize: 10,
                    displayColors: true,
                    titleFont: {
                      size: 14,
                      weight: 'bold',
                    },
                    bodyFont: {
                      size: 13,
                    },
                    callbacks: {
                      title: function(context) {
                        return context[0].label;
                      },
                      label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: $${value.toLocaleString()}`;
                      },
                    },
                  },
                },
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                hover: {
                  mode: 'index',
                  intersect: false,
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(160, 174, 192, 0.1)',
                    },
                    ticks: {
                      color: '#a0aec0',
                      font: {
                        size: 12,
                      },
                      padding: 8,
                    },
                    border: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      color: 'rgba(160, 174, 192, 0.1)',
                    },
                    ticks: {
                      color: '#a0aec0',
                      font: {
                        size: 12,
                      },
                      padding: 8,
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      },
                    },
                    border: {
                      display: false,
                    },
                  },
                },
                elements: {
                  point: {
                    hoverRadius: 8,
                    radius: 4,
                  },
                  line: {
                    tension: 0.4,
                  },
                },
              }}
            />
          </div>
        </div>
        {/* Recent Transactions (40%) */}
        <div className="lg:w-2/5 w-full flex flex-col gap-8">
          <div className="bg-bg-card rounded-xl p-6 shadow-md h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Recent Transaction</div>
              <a href="/transactions" className="text-accent-green text-sm font-medium hover:underline">See all</a>
            </div>
            <div className="flex flex-col gap-4 flex-1 justify-center">
              {recent.map((tx, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={tx.user_avatar || 'https://randomuser.me/api/portraits/men/32.jpg'} alt={tx.user_profile} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="text-sm text-text-muted">Transfers {tx.amount >= 0 ? 'from' : 'to'}</div>
                    <div className="font-medium text-text-main">{tx.user_profile}</div>
                  </div>
                  <div className={`font-semibold ${tx.amount >= 0 ? 'text-accent-green' : 'text-accent-yellow'}`}>{tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table Preview (Full Width) */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">Transactions</div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="bg-bg-main text-text-main rounded-lg px-4 py-2 border border-border-dark focus:outline-none focus:ring-2 focus:ring-accent-green w-64"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-text-muted text-sm">
                <th className="py-2 px-4 font-medium">Name</th>
                <th className="py-2 px-4 font-medium">Date</th>
                <th className="py-2 px-4 font-medium">Amount</th>
                <th className="py-2 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, i) => (
                <tr key={i} className="border-t border-border-dark hover:bg-bg-main transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={tx.user_avatar || 'https://randomuser.me/api/portraits/men/32.jpg'} alt={tx.user_profile} className="w-8 h-8 rounded-full object-cover" />
                    <span>{tx.user_profile}</span>
                  </td>
                  <td className="py-3 px-4">{formatDateWithDay(tx.date)}</td>
                  <td className={`py-3 px-4 font-semibold ${tx.amount >= 0 ? 'text-accent-green' : 'text-accent-yellow'}`}>{tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}</td>
                  <td className="py-3 px-4">{statusChip(tx.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
