
import React from 'react';
import { Shield, Plane, Car } from 'lucide-react';
import DashboardCard from './DashboardCard';

type SavingsGoalType = {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  completionDate: string;
  iconName: string;
};

type SavingsGoalsProps = {
  goals: SavingsGoalType[] | null;
  isLoading: boolean;
  currency?: string;
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={18} />,
  Plane: <Plane size={18} />,
  Car: <Car size={18} />
};

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

const SavingsGoals = ({ goals, isLoading, currency = 'USD' }: SavingsGoalsProps) => {
  if (isLoading) {
    return (
      <DashboardCard title="Savings Goals" isLoading={true} />
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <DashboardCard title="Savings Goals">
        <div className="text-center py-6">
          <p className="text-muted-foreground">No savings goals found</p>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="Savings Goals">
      <div className="space-y-4">
        {goals.map((goal) => {
          const progressPercent = (goal.currentAmount / goal.targetAmount) * 100;
          
          return (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {iconMap[goal.iconName] || <Shield size={18} />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{goal.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-sm text-muted-foreground">
                      Target: {formatCurrency(goal.targetAmount, currency)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      By {formatDate(goal.completionDate)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>{formatCurrency(goal.currentAmount, currency)}</span>
                  <span>{progressPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
        
        <button className="w-full py-2.5 border border-dashed rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors">
          + Create new savings goal
        </button>
      </div>
    </DashboardCard>
  );
};

export default SavingsGoals;
