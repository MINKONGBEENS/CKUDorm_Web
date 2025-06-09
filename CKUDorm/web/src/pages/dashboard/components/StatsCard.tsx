import React from 'react';
import { twMerge } from 'tailwind-merge';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-[#006272]',
  className
}) => {
  return (
    <div
      className={twMerge(
        'bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center',
        className
      )}
    >
      <div>
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className={twMerge('w-12 h-12 rounded-full flex items-center justify-center', iconBgColor)}>
        <i className={twMerge(`fas fa-${icon} text-xl`, iconColor)}></i>
      </div>
    </div>
  );
}; 