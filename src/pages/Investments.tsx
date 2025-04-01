
import React from 'react';
import { LineChart, PieChart, Wallet, Download } from 'lucide-react';
import { api } from '../services/api';
import { useFetchData } from '../hooks/useFetchData';
import DashboardCard from '../components/dashboard/DashboardCard';
import InvestmentPortfolio from '../components/dashboard/InvestmentPortfolio';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0EA5E9', '#14B8A6', '#6366F1', '#F59E0B', '#EC4899'];

const Investments = () => {
  const { data: accountData } = useFetchData(api.fetchAccountSummary);
  const { data: investments, loading: investmentsLoading } = useFetchData(api.fetchInvestments);
  const { data: portfolioData, loading: portfolioChartLoading } = useFetchData(() => api.fetchChartData('portfolio'));

  const currency = accountData?.currency || 'USD';
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Prepare data for pie chart
  const pieData = investments ? investments.map(inv => ({
    name: inv.name,
    value: inv.value
  })) : [];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Investments</h1>
        
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/80 transition-colors">
            <Download size={16} />
            Export
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Wallet size={16} />
            New Investment
          </button>
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
          <DashboardCard title="Portfolio Allocation" isLoading={investmentsLoading}>
            {investments && investments.length > 0 && (
              <div className="space-y-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [formatCurrency(Number(value))]}
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid rgba(0,0,0,0.05)',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {investments.map((inv, index) => (
                    <div key={inv.id} className="flex items-center justify-between py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{inv.name}</span>
                      </div>
                      <span className="font-medium">{inv.allocation}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DashboardCard>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Investment Performance">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Total Return</div>
                <div className="text-2xl font-semibold text-green-600">+12.4%</div>
                <div className="text-muted-foreground text-xs">From all investments</div>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Best Performer</div>
                <div className="text-2xl font-semibold">Renewable Energy</div>
                <div className="text-green-600 text-xs">+5.4% this month</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <LineChart size={16} />
                Performance History
              </h4>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center justify-between mb-1">
                  <span>1 Month</span>
                  <span className="text-green-600">+2.4%</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span>6 Months</span>
                  <span className="text-green-600">+8.7%</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span>1 Year</span>
                  <span className="text-green-600">+12.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>All Time</span>
                  <span className="text-green-600">+24.8%</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Investment Recommendations">
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Clean Energy ETF</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Portfolio diversification into renewable energy with strong growth potential.
              </p>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-green-600">+18.5% (1Y)</span>
                <span className="text-primary underline">View Details</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Global Tech Leaders</h4>
              <p className="text-sm text-muted-foreground mt-1">
                High-performance tech companies with strong market positions.
              </p>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-green-600">+22.1% (1Y)</span>
                <span className="text-primary underline">View Details</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <h4 className="font-medium">Dividend Growth Fund</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Steady income from companies with consistent dividend payments.
              </p>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-green-600">+8.2% (1Y)</span>
                <span className="text-primary underline">View Details</span>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Investments;
