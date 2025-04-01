
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import DashboardCard from './DashboardCard';

type InvestmentPortfolioProps = {
  investments: { id: string; name: string; symbol: string; value: number; units: number; change: number; allocation: number; }[] | null;
  chartData: { name: string; value: number }[] | null;
  isLoading: boolean;
  currency?: string;
};

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

const InvestmentPortfolio = ({ 
  investments, 
  chartData, 
  isLoading, 
  currency = 'USD' 
}: InvestmentPortfolioProps) => {
  if (isLoading) {
    return (
      <DashboardCard title="Investment Portfolio" isLoading={true}>
        <div />
      </DashboardCard>
    );
  }

  if (!investments || investments.length === 0) {
    return (
      <DashboardCard title="Investment Portfolio">
        <div className="text-center py-6">
          <p className="text-muted-foreground">No investment data available</p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Investment Portfolio">
      <div className="space-y-6">
        {/* Portfolio Chart */}
        {chartData && chartData.length > 0 && (
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  hide={true}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value), currency)]}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0EA5E9" 
                  strokeWidth={2}
                  fill="url(#portfolioGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {/* Investments List */}
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">
                  Value
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">
                  Change
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">
                  Allocation
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {investments.map((investment) => (
                <tr key={investment.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="font-medium">{investment.name}</div>
                      <div className="text-sm text-muted-foreground">{investment.symbol}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="font-medium">{formatCurrency(investment.value, currency)}</div>
                    <div className="text-sm text-muted-foreground">{investment.units} units</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className={`flex items-center justify-end ${
                      investment.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {investment.change >= 0 
                        ? <TrendingUp size={14} className="mr-1" /> 
                        : <TrendingDown size={14} className="mr-1" />
                      }
                      <span>{investment.change >= 0 ? '+' : ''}{investment.change}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="font-medium">{investment.allocation}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardCard>
  );
};

export default InvestmentPortfolio;
