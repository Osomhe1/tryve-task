
import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Clock, Wallet, PiggyBank, BarChart3 } from 'lucide-react';
import DashboardCard from './DashboardCard';

type TransactionType = {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type TransactionHistoryProps = {
  transactions: TransactionType[] | null;
  isLoading: boolean;
  currency?: string;
};

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return <ArrowDownLeft size={16} className="text-green-500" />;
    case 'withdrawal':
      return <ArrowUpRight size={16} className="text-red-500" />;
    case 'transfer':
      return <Wallet size={16} className="text-blue-500" />;
    case 'payment':
      return <Clock size={16} className="text-orange-500" />;
    case 'investment':
      return <BarChart3 size={16} className="text-purple-500" />;
    default:
      return <Clock size={16} className="text-gray-500" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Income':
      return <ArrowDownLeft size={16} className="text-green-500" />;
    case 'Savings':
      return <PiggyBank size={16} className="text-blue-500" />;
    case 'Investment':
      return <BarChart3 size={16} className="text-purple-500" />;
    default:
      return <Wallet size={16} className="text-gray-500" />;
  }
};

const TransactionHistory = ({ 
  transactions, 
  isLoading, 
  currency = 'USD' 
}: TransactionHistoryProps) => {
  if (isLoading) {
    return (
      <DashboardCard title="Recent Transactions" isLoading={true}>
        <div />
      </DashboardCard>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <DashboardCard title="Recent Transactions">
        <div className="text-center py-6">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Recent Transactions">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                {getTransactionIcon(transaction.type)}
              </div>
              <div>
                <h4 className="font-medium">{transaction.description}</h4>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <span>{formatDate(transaction.date)}</span>
                  <span className="flex items-center gap-1">
                    {getCategoryIcon(transaction.category)}
                    {transaction.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={`font-medium ${
              transaction.type === 'deposit' ? 'text-green-600' : 
              transaction.type === 'withdrawal' || transaction.type === 'payment' ? 'text-red-600' :
              'text-foreground'
            }`}>
              {transaction.type === 'deposit' ? '+' : 
               transaction.type === 'withdrawal' || transaction.type === 'payment' ? '-' : ''}
              {formatCurrency(transaction.amount, currency)}
            </div>
          </div>
        ))}
        
        <button className="w-full py-2 text-sm font-medium text-primary hover:underline transition-colors">
          View all transactions
        </button>
      </div>
    </DashboardCard>
  );
};

export default TransactionHistory;
