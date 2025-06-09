import React from 'react';
import { useDashboardStore } from '../../../store/dashboard';

interface NotificationPanelProps {
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { notifications, markNotificationAsRead } = useDashboardStore();

  const handleNotificationClick = (id: number) => {
    markNotificationAsRead(id);
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium">알림</h3>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 ${
                notification.isNew ? "bg-blue-50" : ""
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {notification.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            새로운 알림이 없습니다
          </div>
        )}
      </div>
      <div className="p-3 text-center border-t border-gray-100">
        <button
          onClick={onClose}
          className="text-[#006272] text-sm font-medium hover:underline"
        >
          닫기
        </button>
      </div>
    </div>
  );
}; 