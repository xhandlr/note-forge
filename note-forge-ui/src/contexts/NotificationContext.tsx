import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message: string;
    duration?: number;
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
    showSuccess: (message: string, title?: string) => void;
    showError: (message: string, title?: string) => void;
    showWarning: (message: string, title?: string) => void;
    showInfo: (message: string, title?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        const id = Date.now().toString();
        const newNotification: Notification = {
            ...notification,
            id,
            duration: notification.duration || 4000,
        };

        setNotifications(prev => [...prev, newNotification]);

        // Auto remove after duration
        setTimeout(() => {
            removeNotification(id);
        }, newNotification.duration);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const showSuccess = (message: string, title?: string) => {
        addNotification({ type: 'success', message, title });
    };

    const showError = (message: string, title?: string) => {
        addNotification({ type: 'error', message, title });
    };

    const showWarning = (message: string, title?: string) => {
        addNotification({ type: 'warning', message, title });
    };

    const showInfo = (message: string, title?: string) => {
        addNotification({ type: 'info', message, title });
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                showSuccess,
                showError,
                showWarning,
                showInfo,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};