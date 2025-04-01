
import React from 'react';
import { PiggyBank, Plus, TrendingUp, Clock } from 'lucide-react';
import { api } from '../services/api';
import { useFetchData } from '../hooks/useFetchData';
import DashboardCard from '../components/dashboard/DashboardCard';
import SavingsGoals from '../components/dashboard/SavingsGoals';

const Savings = () => {
  const { data: accountData } = useFetchData(api.fetchAccountSummary);
  const { data: savingsGoals, loading: savingsLoading } = useFetchData(api.fetchSavingsGoals);

  const currency = accountData?.currency || 'USD';
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Savings</h1>
        
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors sm:w-auto w-full justify-center">
          <Plus size={16} />
          Create New Goal
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <DashboardCard className="h-full bg-gradient-to-b from-secondary-600 to-secondary-700 text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <PiggyBank size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-white/80">Total Savings</h3>
                  <p className="text-2xl font-bold">{formatCurrency(accountData?.savingsBalance || 0)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                    <TrendingUp size={14} />
                    Interest Rate
                  </div>
                  <p className="font-medium">2.5% APY</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                    <Clock size={14} />
                    Next Interest
                  </div>
                  <p className="font-medium">Dec 15, 2023</p>
                </div>
              </div>
              
              <button className="w-full mt-2 bg-white/10 hover:bg-white/20 transition-colors text-white font-medium rounded-lg py-2.5 text-sm">
                Add to Savings
              </button>
            </div>
          </DashboardCard>
        </div>
        
        <div className="md:col-span-2">
          <SavingsGoals 
            goals={savingsGoals} 
            isLoading={savingsLoading} 
            currency={currency}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Savings Tips">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Automatic Transfers</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Set up automatic transfers to your savings account each payday to build your savings consistently.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">50/30/20 Rule</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">High-Yield Savings</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Consider moving your emergency fund to a high-yield savings account to earn more interest.
              </p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Savings Calculator">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Calculate Your Savings</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Monthly Contribution
                  </label>
                  <input 
                    type="number" 
                    className="w-full rounded-md border py-2 px-3" 
                    placeholder="500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Time Period (Months)
                  </label>
                  <input 
                    type="number" 
                    className="w-full rounded-md border py-2 px-3" 
                    placeholder="12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Interest Rate (% APY)
                  </label>
                  <input 
                    type="number" 
                    className="w-full rounded-md border py-2 px-3" 
                    placeholder="2.5"
                  />
                </div>
                
                <button className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium text-sm">
                  Calculate
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Result</h4>
              <p className="text-2xl font-bold">$6,126.25</p>
              <p className="text-sm text-muted-foreground">
                Total savings after 12 months at 2.5% APY with $500 monthly deposits
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Savings;
