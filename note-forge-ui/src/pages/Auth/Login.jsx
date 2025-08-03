import React, { useState } from 'react';
import { loginUser } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';


// UI Components
import Button from '../../components/UI/Button';
import Icon from '../../components/UI/Icon';
import BgDecoration from '../../components/UI/BgDecoration';

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
        <div className="flex items-center justify-center min-h-screen h-screen">
            <BgDecoration 
                file="orange.png"
                position='top-0 left-0'
            />
            <BgDecoration 
                file="yellow.png"
                position='top-0 right-0'
            />
            <div className="w-1/3 h-[80vh] bg-white text-black rounded-lg shadow-lg flex flex-col justify-start items-center">
            <div className="flex flex-col items-center w-full">
                <Icon
                    size='w-25 h-25'
                ></Icon>
                <div className="w-full flex flex-col items-center gap-y-4">
                    <form onSubmit={handleSubmit} className="mt-10 w-full flex flex-col items-center gap-y-4">
                        <h1 className='text-2xl font-bold'>Iniciar Sesión</h1>
                        <div className='w-full flex flex-col items-center gap-y-2'>
                            <input type="text" placeholder="Correo electrónico" name="email" required onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 w-4/5 flex items-center gap-x-2"></input>
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className='w-full flex flex-col items-center gap-y-2'>
                            <input type="password" placeholder='Contraseña' name="password" required onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 w-4/5 flex items-center gap-x-2"></input>
                            {errors.password && <p className='error'>{errors.password}</p>}
                        </div>
                        <div className="w-full flex flex-col items-center">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="keepLoggedIn"
                                onChange={handleChange}
                                className="peer sr-only"
                            />
                            <span className="w-8 h-8 rounded border border-gray-400 flex items-center justify-center bg-white peer-checked:bg-pink-500 transition">
                                {/* Checkmark SVG */}
                                <svg
                                    className="w-7 h-7 text-white opacity-0 peer-checked:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span className="text-gray-700">Mantener sesión iniciada</span>
                        </label>
                    </div>
                        <Button
                            children='Ingresar'
                            variant='primary' 
                            type='submit'
                        />
                        <div>
                            <p>¿No tienes una cuenta? <a href="/register" className='auth-link'>Registrarse</a></p>
                        </div>
                    </form>
                    </div>
            </div>
            </div>
        </div>
    );
}

export default Login;