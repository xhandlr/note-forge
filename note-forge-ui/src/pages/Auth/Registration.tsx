import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

// Registration service import
import { validateRegistration } from '../../services/RegistrationService';

// UI Components
import Button from '../../components/UI/Button';
import Icon from '../../components/UI/Icon';
import TextField from '../../components/UI/TextField';
import Select from '../../components/UI/Select';

/**
 * Registration page component.
 * Handles user registration by collecting form data and sending it to the backend.
 * Includes roles for students, teachers, and assistants.
 * Displays validation errors if any fields are incorrect.
 *
 * @component
 * @returns {JSX.Element}
 */

interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
    country: string;
    role: string;
}

interface RegistrationErrors {
    username?: string;
    email?: string;
    password?: string;
    country?: string;
    role?: string;
}

function Registration(): JSX.Element {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register } = useAuth();
    const { showSuccess, showError } = useNotification();

    // Hook for managing form data
    const [formData, setFormData] = useState<RegistrationFormData>({
        username: '',
        email: '',
        password: '',
        country: '',
        role: '',
    });

    // Hook for managing errors
    const [errors, setErrors] = useState<RegistrationErrors>({});

    /**
     * Handles changes to the form inputs.
     * Updates the formData state with the input values.
     *
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const {name, value} = e.target;
        const errorMsg = validateRegistration(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg
        }))
    }

    /**
     * This function is executed when the form is submitted.
     * Uses AuthContext to handle registration.
     * If successful, redirects to login page.
     * If there is an error, shows an error notification.
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            await register(formData);
            showSuccess(t('messages.registerSuccess'));
            navigate('/login');
        } catch (error) {
            showError(t('messages.registerError'));
            if (error && typeof error === 'object') {
                setErrors(error as RegistrationErrors);
            }
            console.error('Error en el registro:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-lg flex flex-col gap-3">
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
                <h2 className="text-3xl font-black text-slate-900 mt-8 mb-10 tracking-tight">{t('auth.register-title')}</h2>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    <TextField
                        type="text"
                        name="username"
                        placeholder={t('auth.username')}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.username}
                    />
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
                    <TextField
                        type="text"
                        name="country"
                        placeholder={t('auth.country')}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.country}
                    />
                    <Select
                        name="role"
                        required
                        onChange={handleChange}
                        value={formData.role}
                        options={[
                            { value: 'student', label: t('roles.student') },
                            { value: 'teacher', label: t('roles.teacher') },
                            { value: 'assistant', label: t('roles.assistant') },
                        ]}
                        error={errors.role}
                    />
                    <Button
                        children={t('auth.register-btn')}
                        type='submit'
                    />
                </form>

                <p className="mt-8 text-slate-600 font-medium">
                    {t('auth.have-account')} <Link to="/login" className="text-slate-900 font-black hover:text-rose-500 transition-colors">{t('auth.login-btn')}</Link>
                </p>
            </div>
            </div>
        </div>
    );
}

export default Registration;