import React, { useEffect, useState, useCallback } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs, { Dayjs } from 'dayjs';
import AlertChip from '../components/AlertChip';
import { fetchTransactions, API_BASE_URL } from '../api/transactions';
import { statusChip } from '../components/StatusChip';

const statusOptions = ['Paid', 'Pending', 'Failed'];
const categoryOptions = ['Revenue', 'Expense'];

const allColumns = [
  { key: 'user_profile', label: 'User' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
];

const TransactionsPage: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [dateStart, setDateStart] = useState<Dayjs | null>(null);
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);
  const [amountMin, setAmountMin] = useState<string>('');
  const [amountMax, setAmountMax] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(allColumns.map(c => c.key));
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  // Fetch unique users for autocomplete
  useEffect(() => {
    fetchTransactions({ limit: 1000 })
      .then(userRes => {
        const users = Array.from(new Set(userRes.data.data.map((t: any) => t.user_profile))) as string[];
        setUserOptions(users);
      });
  }, []);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(0);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Reset page on filter change
  useEffect(() => { setPage(0); }, [status, category, dateStart, dateEnd, amountMin, amountMax, user]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params: any = {
        page: page + 1,
        limit: pageSize,
        search: search || undefined,
        status: status || undefined,
        category: category || undefined,
        user: user || undefined,
        dateFrom: dateStart ? dayjs(dateStart).toISOString() : undefined,
        dateTo: dateEnd ? dayjs(dateEnd).toISOString() : undefined,
        amountMin: amountMin || undefined,
        amountMax: amountMax || undefined,
      };
      const txRes = await fetchTransactions(params);
      setRows(txRes.data.data);
      setTotal(txRes.data.total);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, status, category, dateStart, dateEnd, amountMin, amountMax, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (error) {
      setAlert({ message: error, type: 'error' });
    }
  }, [error]);

  const handleExport = async (columns?: string[]) => {
    try {
      const params = new URLSearchParams({
        search,
        status,
        category,
      });
      if (columns && columns.length) {
        params.append('columns', columns.join(','));
      }
      window.open(`${API_BASE_URL}/transactions/export?${params.toString()}`, '_blank');
      setAlert({ message: 'Export started. Your CSV will download shortly.', type: 'success' });
    } catch {
      setAlert({ message: 'Failed to export CSV', type: 'error' });
    }
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setStatus('');
    setCategory('');
    setPage(0);
    setDateStart(null);
    setDateEnd(null);
    setAmountMin('');
    setAmountMax('');
    setUser('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Alert Chip */}
      {alert && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <AlertChip message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}
      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-bg-card rounded-xl p-8 shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Select columns to export</h3>
            <form onSubmit={e => { e.preventDefault(); setShowExportModal(false); handleExport(selectedColumns); }}>
              <div className="flex flex-col gap-3 mb-6">
                {allColumns.map(col => (
                  <label key={col.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(col.key)}
                      onChange={e => {
                        setSelectedColumns(sel =>
                          e.target.checked
                            ? [...sel, col.key]
                            : sel.filter(k => k !== col.key)
                        );
                      }}
                      className="accent-accent-green w-4 h-4 rounded"
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowExportModal(false)} className="px-4 py-2 rounded-lg border border-border-dark text-text-muted hover:text-accent-green transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-accent-green text-bg-main font-semibold hover:bg-accent-green/80 transition-colors">Export</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-bg-card rounded-xl p-6 shadow-md mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={dateStart}
              onChange={setDateStart}
              maxDate={dateEnd ?? undefined}
              slotProps={{
                textField: {
                  InputProps: {
                    style: { color: '#fff', background: 'transparent' },
                  },
                  InputLabelProps: {
                    style: { color: '#a0aec0' },
                  },
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={dateEnd}
              onChange={setDateEnd}
              minDate={dateStart ?? undefined}
              slotProps={{
                textField: {
                  InputProps: {
                    style: { color: '#fff', background: 'transparent' },
                  },
                  InputLabelProps: {
                    style: { color: '#a0aec0' },
                  },
                },
              }}
            />
          </LocalizationProvider>
          <input
            type="number"
            placeholder="Min Amount"
            value={amountMin}
            onChange={e => setAmountMin(e.target.value.replace(/[^\d.\-]/g, ''))}
            className="bg-bg-main text-text-main rounded-lg px-3 py-2 w-28 focus:outline-none border border-border-dark placeholder:text-text-muted hide-spin"
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={amountMax}
            onChange={e => setAmountMax(e.target.value.replace(/[^\d.\-]/g, ''))}
            className="bg-bg-main text-text-main rounded-lg px-3 py-2 w-28 focus:outline-none border border-border-dark placeholder:text-text-muted hide-spin"
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
          {/* User filter dropdown */}
          <select
            value={user}
            onChange={e => setUser(e.target.value)}
            className="bg-bg-main text-text-main rounded-lg px-3 py-2 w-40 focus:outline-none border border-border-dark"
          >
            <option value="">All Users</option>
            {userOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="bg-bg-main text-text-main rounded-lg px-3 py-2 w-48 focus:outline-none border border-border-dark"
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="bg-bg-main text-text-main rounded-lg px-3 py-2 w-32 focus:outline-none border border-border-dark"
          >
            <option value="">All Status</option>
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-bg-main text-text-main rounded-lg px-3 py-2 w-32 focus:outline-none border border-border-dark"
          >
            <option value="">All Categories</option>
            {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <button onClick={handleClearFilters} className="ml-2 flex items-center gap-1 px-4 py-2 rounded-lg border border-border-dark text-text-muted hover:text-accent-green transition-colors">
            <ClearAllIcon fontSize="small" /> Clear Filters
          </button>
          <button onClick={() => setShowExportModal(true)} className="ml-auto flex items-center gap-1 px-4 py-2 rounded-lg bg-accent-green text-bg-main font-semibold hover:bg-accent-green/80 transition-colors" disabled={rows.length === 0}>
            <DownloadIcon fontSize="small" /> Export CSV
          </button>
        </div>
      </div>
      <div className="flex-1 bg-bg-card rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Transactions</h2>
          <span className="text-sm text-text-muted">Showing {rows.length} of {total} results</span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64 text-text-muted">Loading...</div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">{error}</div>
        ) : (
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
                {rows.map((tx, i) => (
                  <tr key={i} className="border-t border-border-dark hover:bg-bg-main transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img src={tx.user_avatar || 'https://randomuser.me/api/portraits/men/32.jpg'} alt={tx.user_profile} className="w-8 h-8 rounded-full object-cover" />
                      <span>{tx.user_profile}</span>
                    </td>
                    <td className="py-3 px-4">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className={`py-3 px-4 font-semibold ${tx.amount >= 0 ? 'text-accent-green' : 'text-accent-yellow'}`}>{tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}</td>
                    <td className="py-3 px-4">{statusChip(tx.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            className="px-3 py-1 rounded bg-bg-main text-text-main border border-border-dark disabled:opacity-50"
            disabled={page === 0}
          >
            Prev
          </button>
          <span className="text-sm text-text-muted">Page {page + 1} of {Math.ceil(total / pageSize)}</span>
          <button
            onClick={() => setPage(p => (p + 1 < Math.ceil(total / pageSize) ? p + 1 : p))}
            className="px-3 py-1 rounded bg-bg-main text-text-main border border-border-dark disabled:opacity-50"
            disabled={page + 1 >= Math.ceil(total / pageSize)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
