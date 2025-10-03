import React, { useEffect } from 'react';
import { Notification } from '../../contexts/NotificationContext';

interface ToastProps {
    notification: Notification;
    onClose: (id: string) => void;
}

const Toast = ({ notification, onClose }: ToastProps) => {
    const { id, type, title, message } = notification;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, notification.duration || 4000);

        return () => clearTimeout(timer);
    }, [id, notification.duration, onClose]);

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-l-4 border-green-400 text-green-800';
            case 'error':
                return 'bg-red-50 border-l-4 border-red-400 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800';
            case 'info':
                return 'bg-blue-50 border-l-4 border-blue-400 text-blue-800';
            default:
                return 'bg-gray-50 border-l-4 border-gray-400 text-gray-800';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={`w-full ${getStyles()} rounded-lg shadow-lg pointer-events-auto transform transition-all duration-300 ease-in-out animate-slide-in`}
        >
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {getIcon()}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                        {title && (
                            <p className="text-sm font-semibold mb-1">
                                {title}
                            </p>
                        )}
                        <p className="text-sm leading-5">
                            {message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md p-1 transition-colors duration-200"
                            onClick={() => onClose(id)}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;