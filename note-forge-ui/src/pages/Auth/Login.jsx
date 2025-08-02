import React, { useState } from 'react';
import { loginUser } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import Logotype from '../../components/Dashboard/Logotype';
import Icon from '../../components/UI/Icon';

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
        <div className="flex items-center justify-center min-h-screen h-screen bg-(--color-primary)">
            <div className="w-1/3 h-[80%] bg-white text-black rounded-lg shadow-lg flex flex-col justify-center">
            <div>
                <Icon></Icon>
                <Logotype></Logotype>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <div>
                        <input type="text" placeholder="Correo electrónico" name="email" required onChange={handleChange}></input>
                        <box-icon type='solid' name='envelope' className="i"></box-icon>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <input type="password" placeholder='Contraseña' name="password" required onChange={handleChange}></input>
                        <box-icon name='lock-alt' type='solid' className="i"></box-icon>
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="keepLoggedIn" onChange={handleChange} />
                            Mantener sesión iniciada
                        </label>
                    </div>

                    <button type="submit">Ingresar</button>
    
                    <div>
                        <p>¿No tienes una cuenta? <a href="/register" className='auth-link'>Registrarse</a></p>
                    </div>
                </form>

                <div> Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons"> Smashicons </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Login;