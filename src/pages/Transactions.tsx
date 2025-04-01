
import React, { useState } from 'react';
import { Filter, Download, Search } from 'lucide-react';
import { api } from '../services/api';
import { useFetchData } from '../hooks/useFetchData';
import DashboardCard from '../components/dashboard/DashboardCard';
import TransactionHistory from '../components/dashboard/TransactionHistory';

const Transactions = () => {
  const { data: accountData } = useFetchData(api.fetchAccountSummary);
  const { data: transactions, loading: transactionsLoading } = useFetchData(api.fetchTransactions);
  const [searchTerm, setSearchTerm] = useState('');

  const currency = accountData?.currency || 'USD';
  
  // Filter transactions based on search term
  const filteredTransactions = transactions 
    ? transactions.filter(txn => 
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        
        <div className="flex items-center gap-2 sm:w-auto w-full">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/80 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/80 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full py-2.5 pl-10 pr-4 rounded-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
        </div>
      </div>
      
      <DashboardCard>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredTransactions.map((transaction) => {
                const date = new Date(transaction.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                
                const amount = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: currency
                }).format(transaction.amount);
                
                const amountClass = 
                  transaction.type === 'deposit' ? 'text-green-600' : 
                  transaction.type === 'withdrawal' || transaction.type === 'payment' ? 'text-red-600' :
                  'text-foreground';
                
                return (
                  <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-accent">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {date}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right font-medium ${amountClass}`}>
                      {transaction.type === 'deposit' ? '+' : 
                       transaction.type === 'withdrawal' || transaction.type === 'payment' ? '-' : ''}
                      {amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="capitalize text-sm">{transaction.type}</span>
                    </td>
                  </tr>
                );
              })}
              
              {filteredTransactions.length === 0 && !transactionsLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    {searchTerm 
                      ? "No transactions match your search. Try a different term." 
                      : "No transactions found."}
                  </td>
                </tr>
              )}
              
              {transactionsLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default Transactions;
