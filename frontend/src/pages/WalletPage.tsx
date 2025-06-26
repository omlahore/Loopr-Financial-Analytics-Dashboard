import React, { useState } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const sampleAccounts = [
  { id: 1, name: 'Checking', type: 'Checking', balance: 3200.50, icon: <AccountBalanceWalletIcon className="text-accent-green" /> },
  { id: 2, name: 'Savings', type: 'Savings', balance: 8500.00, icon: <SavingsIcon className="text-accent-yellow" /> },
  { id: 3, name: 'Credit Card', type: 'Credit', balance: -1200.75, icon: <CreditCardIcon className="text-accent-red" /> },
];

const sampleActivity = [
  { id: 1, date: '2024-05-20', type: 'Transfer', amount: -200, account: 'Checking', desc: 'Transfer to Savings' },
  { id: 2, date: '2024-05-18', type: 'Deposit', amount: 1000, account: 'Savings', desc: 'Paycheck' },
  { id: 3, date: '2024-05-15', type: 'Withdrawal', amount: -50, account: 'Checking', desc: 'ATM Withdrawal' },
  { id: 4, date: '2024-05-10', type: 'Payment', amount: -300, account: 'Credit Card', desc: 'Credit Card Payment' },
];

const WalletPage: React.FC = () => {
  const [spendingLimit, setSpendingLimit] = useState(1000);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(500);

  const totalBalance = sampleAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold tracking-tight mb-4 bg-gradient-to-r from-accent-green to-accent-yellow bg-clip-text text-transparent drop-shadow-lg">Wallet Overview</div>
      {/* Total Balance */}
      <div className="bg-bg-card rounded-xl p-6 flex items-center gap-6 shadow-md border border-accent-green/20 mb-4">
        <AccountBalanceWalletIcon className="text-4xl text-accent-green mr-2" />
        <div>
          <div className="text-sm text-text-muted font-medium">Total Balance</div>
          <div className="text-3xl font-bold text-accent-green drop-shadow">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
      {/* Account Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sampleAccounts.map(acc => (
          <div key={acc.id} className="bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 rounded-xl p-6 flex items-center gap-4 shadow-md border border-accent-green/20">
            {acc.icon}
            <div>
              <div className="text-sm text-text-muted font-medium">{acc.type} Account</div>
              <div className="text-lg font-bold text-text-main">{acc.name}</div>
              <div className={`text-xl font-bold ${acc.balance >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{acc.balance >= 0 ? '$' : '-$'}{Math.abs(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md mb-8">
        <div className="text-lg font-semibold mb-4">Recent Activity</div>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-text-muted text-sm">
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Type</th>
              <th className="py-2 px-4 font-medium">Account</th>
              <th className="py-2 px-4 font-medium">Description</th>
              <th className="py-2 px-4 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sampleActivity.map(act => (
              <tr key={act.id} className="border-t border-border-dark hover:bg-bg-main transition-colors">
                <td className="py-3 px-4">{act.date}</td>
                <td className="py-3 px-4">{act.type}</td>
                <td className="py-3 px-4">{act.account}</td>
                <td className="py-3 px-4">{act.desc}</td>
                <td className={`py-3 px-4 font-semibold ${act.amount >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{act.amount >= 0 ? '+' : '-'}${Math.abs(act.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Security & Settings */}
      <div className="bg-bg-card rounded-xl p-6 shadow-md flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <NotificationsActiveIcon className="text-accent-yellow" />
          <div className="text-lg font-semibold">Security & Settings</div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm text-text-muted mb-1">Spending Limit ($)</label>
            <input type="number" value={spendingLimit} onChange={e => setSpendingLimit(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg bg-bg-main border border-border-dark text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green" />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-text-muted mb-1">Low Balance Alert ($)</label>
            <input type="number" value={lowBalanceAlert} onChange={e => setLowBalanceAlert(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg bg-bg-main border border-border-dark text-text-main focus:outline-none focus:ring-2 focus:ring-accent-yellow" />
          </div>
        </div>
        <div className="text-xs text-text-muted mt-2">Set your spending limit and get notified when your balance drops below your alert threshold.</div>
      </div>
    </div>
  );
};

export default WalletPage; 