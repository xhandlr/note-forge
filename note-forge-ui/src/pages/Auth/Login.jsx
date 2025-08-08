import React, { useState } from 'react';
import { loginUser } from '../../services/LoginService';
import { useNavigate, Link } from 'react-router-dom';

// UI Components
import Button from '../../components/UI/Button';
import Icon from '../../components/UI/Icon';
import BgDecoration from '../../components/UI/BgDecoration';
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

function Login() {

    // Hooks for managing form data and errors
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });
    const [ errors, setErrors ] = useState({});

    // Hook for navigation
    const navigate = useNavigate();

    /**
     * Its executed when the user types in the input fields.
     * Updates the formData state with the input values.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e 
     */
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    /**
     * This function is executed when the form is submitted.
     * Calls the login service with the form data.
     * If the login is successful, it saves the token in localStorage and redirects the user to the dashboard.
     * If there is an error, it shows an alert with the error message.
     *
     * @param {React.FormEvent<HTMLInputElement>} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData); 
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error en el login:', error);
        }
    };    

    return (
        <div className="flex items-start justify-center min-h-screen h-screen">
            <BgDecoration 
                file="orange.png"
                position='top-0 left-0'
            />
            <BgDecoration 
                file="yellow.png"
                position='top-0 right-0'
            />
            <div className="min-w-[600px] w-1/3 min-h-[400px]bg-white text-black rounded-lg border-2 border-gray-200 flex flex-col justify-start items-center px-10 py-20 mt-20">
            <div className="flex flex-col items-center w-full">
                <Icon
                    size='w-25 h-25'
                ></Icon>
                <div className="w-full flex flex-col items-center gap-y-4">
                    <form onSubmit={handleSubmit} className="mt-10 w-full flex flex-col items-center gap-y-4">
                        <h1 className='text-2xl font-bold'>Iniciar Sesión</h1>
                        <TextField
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            required
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            required
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <Checkbox
                            name="keepLoggedIn"
                            checked={formData.keepLoggedIn || false}
                            onChange={handleChange}
                            label="Mantener sesión iniciada"
                        />
                        <Button
                            children='Ingresar'
                            variant='primary' 
                            type='submit'
                        />
                        <div>
                            <p>¿No tienes una cuenta? <Link to="/register" className='font-semibold hover:text-pink-600'>Registrarse</Link></p>
                        </div>
                    </form>
                    </div>
            </div>
            </div>
        </div>
    );
}

export default Login;