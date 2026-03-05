import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Notification } from '../../contexts/NotificationContext';

interface ToastProps {
    notification: Notification;
    onClose: (id: string) => void;
}

const configs = {
    success: { Icon: CheckCircle, accent: 'border-l-emerald-500', bar: 'bg-emerald-500', iconClass: 'text-emerald-500' },
    error:   { Icon: XCircle,    accent: 'border-l-rose-500',    bar: 'bg-rose-500',    iconClass: 'text-rose-500'    },
    warning: { Icon: AlertTriangle, accent: 'border-l-amber-400', bar: 'bg-amber-400',  iconClass: 'text-amber-500'   },
    info:    { Icon: Info,        accent: 'border-l-slate-900',   bar: 'bg-slate-900',   iconClass: 'text-slate-500'   },
} as const;

const Toast = ({ notification, onClose }: ToastProps) => {
    const { id, type, title, message, duration = 4000 } = notification;
    const { t } = useTranslation();
    const { Icon, accent, bar, iconClass } = configs[type] ?? configs.info;
    const label = title || t(`toast.${type}` as const, t('toast.info'));

    useEffect(() => {
        const timer = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
        <div className={`bg-white rounded-2xl shadow-2xl border border-slate-100 border-l-4 ${accent} overflow-hidden w-80 animate-in slide-in-from-right-4 fade-in duration-300 pointer-events-auto`}>
            <div className="flex items-start gap-3 px-4 pt-4 pb-3">
                <div className={`mt-0.5 shrink-0 ${iconClass}`}>
                    <Icon size={17} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                        {label}
                    </p>
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                        {message}
                    </p>
                </div>
                <button
                    onClick={() => onClose(id)}
                    className="shrink-0 p-1 rounded-lg hover:bg-slate-100 text-slate-300 hover:text-slate-600 transition-colors"
                >
                    <X size={13} strokeWidth={2.5} />
                </button>
            </div>
            <div className="h-0.5 bg-slate-100 mx-4 mb-3 rounded-full overflow-hidden">
                <div
                    className={`h-full ${bar} rounded-full origin-left`}
                    style={{ animation: `toast-shrink ${duration}ms linear forwards` }}
                />
            </div>
        </div>
    );
};

export default Toast;
