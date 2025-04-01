
import React from 'react';
import { TrendingUp, TrendingDown, Wallet, PiggyBank, BarChart3 } from 'lucide-react';
import DashboardCard from './DashboardCard';

type AccountSummaryProps = {
  accountData: {
    balance: number;
    savingsBalance: number;
    investmentBalance: number;
    currency: string;
    lastUpdate: string;
  } | null;
  isLoading: boolean;
};

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

const AccountSummary = ({ accountData, isLoading }: AccountSummaryProps) => {
  if (isLoading) {
    return (
      <DashboardCard isLoading={true} className="h-48">
        <div />
      </DashboardCard>
    );
  }

  if (!accountData) {
    return (
      <DashboardCard>
        <div className="text-center py-6">
          <p className="text-muted-foreground">Account data unavailable</p>
        </div>
      </DashboardCard>
    );
  }

  const { balance, savingsBalance, investmentBalance, currency } = accountData;

  return (
    <DashboardCard className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div>
        <h3 className="font-medium opacity-80 flex items-center gap-2">
          <Wallet size={16} />
          Total Balance
        </h3>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-3xl font-bold">{formatCurrency(balance, currency)}</span>
          <span className="text-green-300 font-medium text-sm flex items-center pb-1">
            <TrendingUp size={16} className="mr-1" />
            +4.3%
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-medium text-white/80 flex items-center gap-2 text-sm">
              <PiggyBank size={14} />
              Savings
            </h4>
            <p className="mt-1 text-lg font-semibold">{formatCurrency(savingsBalance, currency)}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-medium text-white/80 flex items-center gap-2 text-sm">
              <BarChart3 size={14} />
              Investments
            </h4>
            <p className="mt-1 text-lg font-semibold">{formatCurrency(investmentBalance, currency)}</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AccountSummary;
