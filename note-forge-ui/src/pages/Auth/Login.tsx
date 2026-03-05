import React, { useState } from 'react';
import { validateLogin } from '../../services/LoginService';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

// UI Components
import Button from '../../components/UI/Button';
import Icon from '../../components/UI/Icon';
import TextField from '../../components/UI/TextField';
import Checkbox from '../../components/UI/Checkbox';

/**
 * Login page component.
 * Allows users to log in to their account.
 * Also includes an option to keep the session active.
 *
 * @component
 * @returns {JSX.Element}
 */

interface LoginFormData {
    email: string;
    password: string;
    keepLoggedIn?: boolean;
}

interface LoginErrors {
    email?: string;
    password?: string;
    auth?: string;
}

function Login(): JSX.Element {

    const { t } = useTranslation();
    // Hooks for managing form data and errors
    const [ formData, setFormData ] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [ errors, setErrors ] = useState<LoginErrors>({});

    // Hook for navigation
    const navigate = useNavigate();

    // Auth and notification contexts
    const { login } = useAuth();
    const { showSuccess, showError } = useNotification();

    /**
     * Its executed when the user types in the input fields.
     * Updates the formData state with the input values.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    /**
     * This function is executed when the form is submitted.
     * Uses AuthContext to handle login.
     * If the login is successful, redirects the user to the dashboard.
     * If there is an error, shows an error notification.
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password, formData.keepLoggedIn);
            showSuccess(t('messages.loginSuccess'));
            navigate('/dashboard');
        } catch (error) {
            setErrors({ auth: t('auth.error-credentials') });
            showError(t('messages.loginError'));
        }
    };    

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        const errorMsg = validateLogin(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg
        }));
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md flex flex-col gap-3">
            <Link
                to="/"
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors self-start"
            >
                <ArrowLeft size={16} strokeWidth={2.5} /> {t('auth.back-home')}
            </Link>
            <div className="bg-white w-full p-10 rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col items-center">
                <Icon
                    size='w-10 h-10'
                    type='logotype'
                    fontSize='text-2xl'
                />
                <h2 className="text-3xl font-black text-slate-900 mt-8 mb-10 tracking-tight">{t('auth.login-btn')}</h2>

                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <TextField
                        type="email"
                        name="email"
                        placeholder={t('auth.email')}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                    />

                    <TextField
                        type="password"
                        name="password"
                        placeholder={t('auth.password')}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password}
                    />

                    {errors.auth && <p className="text-red-500 text-sm font-bold text-center">{errors.auth}</p>}

                    <Checkbox
                        name="keepLoggedIn"
                        checked={formData.keepLoggedIn || false}
                        onChange={handleChange}
                        label={t('auth.keep-logged-in')}
                    />

                    <Button
                        children={t('auth.login-btn')}
                        variant='primary'
                        type='submit'
                    />
                </form>

                <p className="mt-8 text-slate-600 font-medium">
                    {t('auth.no-account')} <Link to="/register" className="text-slate-900 font-black hover:text-rose-500 transition-colors">{t('auth.register-btn')}</Link>
                </p>
            </div>
            </div>
        </div>
    );
}

export default Login;