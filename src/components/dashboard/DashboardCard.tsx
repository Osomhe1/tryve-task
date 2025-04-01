
import React from 'react';

type DashboardCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

const DashboardCard = ({ 
  title, 
  children, 
  className = '', 
  isLoading = false 
}: DashboardCardProps) => {
  return (
    <div className={`bg-card rounded-xl border shadow-sm animate-fade-in ${className}`}>
      {isLoading ? (
        <div className="p-6 flex flex-col space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse w-1/3"></div>
          <div className="h-24 bg-muted rounded animate-pulse"></div>
        </div>
      ) : (
        <>
          {title && (
            <div className="p-6 pb-0">
              <h3 className="text-xl font-medium text-card-foreground">{title}</h3>
            </div>
          )}
          <div className="p-6">{children}</div>
        </>
      )}
    </div>
  );
};

export default DashboardCard;
