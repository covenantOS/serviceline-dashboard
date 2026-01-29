import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`border rounded p-4 ${className}`}>
      {children}
    </div>
  );
}
