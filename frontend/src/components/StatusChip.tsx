import React from 'react';

export const statusChip = (status: string) => {
  let bg = '';
  let text = '';
  if (status === 'Completed' || status === 'Paid') {
    bg = 'bg-green-600 bg-opacity-20';
    text = 'text-green-400';
  } else if (status === 'Pending') {
    bg = 'bg-yellow-500 bg-opacity-20';
    text = 'text-yellow-400';
  } else {
    bg = 'bg-red-600 bg-opacity-20';
    text = 'text-red-400';
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>{status}</span>
  );
}; 