
import React from 'react';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
};

const Loader = ({ size = 'md', className = '', text }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin ${sizeClasses[size]}`}></div>
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export default Loader;
