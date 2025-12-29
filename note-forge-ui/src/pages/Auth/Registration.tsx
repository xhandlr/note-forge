import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';

// Registration service import
import { registerUser, validateRegistration } from '../../services/RegistrationService';

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
function Registration() { 

    const navigate = useNavigate();

    // Hook for managing form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
        role: '',
    });

    // Hook for managing errors
    const [errors, setErrors] = useState({});

    /**
     * Handles changes to the form inputs.
     * Updates the formData state with the input values.
     *
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e 
     */
    const handleChange = (e) => { 
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleBlur = (e) => {
        const {name, value} = e.target;
        const errorMsg = validateRegistration(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg
        }))
    }

    /**
     * This function is executed when the form is submitted.
     * Calls the registration service with the form data.
     * If there is an error, it shows an alert with the error message.
     * 
     * @param {React.ChangeEvent<HTMLFormElement>} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser(formData);    
            if (data.message) {
                alert('Registro exitoso');
                navigate('/login');

            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            setErrors(error);
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
                        onBlur={handleBlur}
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