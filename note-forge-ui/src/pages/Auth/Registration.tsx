import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

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
            showSuccess('Registro exitoso. Por favor inicia sesión.');
            navigate('/login');
        } catch (error) {
            showError('Error al registrar usuario');
            if (error && typeof error === 'object') {
                setErrors(error as RegistrationErrors);
            }
            console.error('Error en el registro:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg p-10 rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col items-center">
                <Icon
                    size='w-10 h-10'
                    type='logotype'
                    fontSize='text-2xl'
                />
                <h2 className="text-3xl font-black text-slate-900 mt-8 mb-10 tracking-tight">Crear cuenta</h2>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    <TextField
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.username}
                    />
                    <TextField
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                    />
                    <TextField
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password}
                    />
                    <TextField
                        type="text"
                        name="country"
                        placeholder="País"
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
                            { value: 'student', label: 'Estudiante' },
                            { value: 'teacher', label: 'Profesor' },
                            { value: 'assistant', label: 'Ayudante' },
                        ]}
                        error={errors.role}
                    />
                    <Button
                        children={'Crear cuenta'}
                        type='submit'
                    />
                </form>

                <p className="mt-8 text-slate-600 font-medium">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-slate-900 font-black hover:text-rose-500 transition-colors">Iniciar Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Registration;