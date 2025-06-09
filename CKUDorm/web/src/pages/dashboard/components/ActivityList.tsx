import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDashboardStore } from '../../../store/dashboard';

// TODO: 활동 유형 구분을 위한 type 변수 구현 예정
/* type ActivityType = 'notice' | 'repair' | 'leave'; */

type ActivityType = 'ALL' | 'REPAIR' | 'STAYOUT' | 'QNA';

interface ActivityFilterButtonProps {
  // @ts-ignore - 추후 타입별 스타일링이나 동작 구분을 위해 보존
  type: ActivityType;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ActivityFilterButton: React.FC<ActivityFilterButtonProps> = ({
  // @ts-ignore - 추후 사용 예정
  type,
  active,
  onClick,
  children
}) => (
  <button
    onClick={onClick}
    className={twMerge(
      'px-3 py-1 text-sm rounded-full',
      active ? 'bg-[#006272] text-white' : 'text-gray-600 hover:bg-gray-100'
    )}
  >
    {children}
  </button>
);

export const ActivityList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ActivityType>('ALL');
  const { activities } = useDashboardStore();

  const filteredActivities = activities.filter(
    (activity) => activeFilter === 'ALL' || activity.type === activeFilter
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold">최근 활동</h2>
        <div className="flex space-x-2">
          <ActivityFilterButton
            type="ALL"
            active={activeFilter === 'ALL'}
            onClick={() => setActiveFilter('ALL')}
          >
            전체
          </ActivityFilterButton>
          <ActivityFilterButton
            type="REPAIR"
            active={activeFilter === 'REPAIR'}
            onClick={() => setActiveFilter('REPAIR')}
          >
            고장수리
          </ActivityFilterButton>
          <ActivityFilterButton
            type="STAYOUT"
            active={activeFilter === 'STAYOUT'}
            onClick={() => setActiveFilter('STAYOUT')}
          >
            외박신청
          </ActivityFilterButton>
          <ActivityFilterButton
            type="QNA"
            active={activeFilter === 'QNA'}
            onClick={() => setActiveFilter('QNA')}
          >
            QnA
          </ActivityFilterButton>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg"
            >
              <div
                className={twMerge(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  activity.iconBgColor
                )}
              >
                <i className={twMerge(`fas fa-${activity.icon}`, activity.iconColor)}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{activity.title}</h3>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <p className="text-gray-600 mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 