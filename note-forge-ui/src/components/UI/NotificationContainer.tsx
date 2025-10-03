import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import Toast from './Toast';

const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotification();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-4 w-full max-w-md">
            {notifications.map((notification) => (
                <Toast
                    key={notification.id}
                    notification={notification}
                    onClose={removeNotification}
                />
            ))}
        </div>
    );
};

export default NotificationContainer;