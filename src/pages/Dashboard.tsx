
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { api } from '../services/api';
import { useFetchData } from '../hooks/useFetchData';
import AccountSummary from '../components/dashboard/AccountSummary';
import InvestmentPortfolio from '../components/dashboard/InvestmentPortfolio';
import SavingsGoals from '../components/dashboard/SavingsGoals';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import DashboardCard from '../components/dashboard/DashboardCard';
import Loader from '../components/ui/Loader';

const Dashboard = () => {
  const { data: accountData, loading: accountLoading } = useFetchData(api.fetchAccountSummary);
  const { data: investments, loading: investmentsLoading } = useFetchData(api.fetchInvestments);
  const { data: savingsGoals, loading: savingsLoading } = useFetchData(api.fetchSavingsGoals);
  const { data: transactions, loading: transactionsLoading } = useFetchData(() => api.fetchTransactions(5));
  const { data: portfolioData, loading: portfolioChartLoading } = useFetchData(() => api.fetchChartData('portfolio'));

  const currency = accountData?.currency || 'USD';

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <AccountSummary 
            accountData={accountData} 
            isLoading={accountLoading} 
          />
        </div>
        <div>
          <DashboardCard title="Quick Actions" className="h-full">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-secondary text-secondary-foreground rounded-lg px-4 py-3 font-medium text-sm hover:bg-secondary/90 transition-colors">
                <span>Add Money</span>
                <PlusCircle size={18} />
              </button>
              <button className="w-full flex items-center justify-between bg-accent text-accent-foreground rounded-lg px-4 py-3 font-medium text-sm hover:bg-accent/90 transition-colors">
                <span>Send Money</span>
                <span className="w-5 h-5 flex items-center justify-center">→</span>
              </button>
              <button className="w-full flex items-center justify-between bg-accent text-accent-foreground rounded-lg px-4 py-3 font-medium text-sm hover:bg-accent/90 transition-colors">
                <span>Request Money</span>
                <span className="w-5 h-5 flex items-center justify-center">←</span>
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <InvestmentPortfolio 
            investments={investments} 
            chartData={portfolioData}
            isLoading={investmentsLoading || portfolioChartLoading}
            currency={currency}
          />
        </div>
        <div>
          <SavingsGoals 
            goals={savingsGoals} 
            isLoading={savingsLoading} 
            currency={currency}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <TransactionHistory 
            transactions={transactions} 
            isLoading={transactionsLoading} 
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
