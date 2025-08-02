import React, { useState } from 'react'; 

// Registration service import
import { registerUser } from '../../services/RegistrationService';

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
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            setErrors(error);
            console.error('Error en el registro:', error);
        }
    };
    
    return (
        <div className='login-page'>
            <div className="wrapper">
                <form onSubmit={handleSubmit}> 
                <h1>Registrarse</h1>

                <div className="input-box">
                    <input type="text" name="username" placeholder="Nombre" required onChange={handleChange}></input>
                    <box-icon name='user-circle'></box-icon>
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="input-box">
                    <input type="text" name="email" placeholder="Correo electrónico" required onChange={handleChange}></input>
                    <box-icon type='solid' name='envelope' class="i"></box-icon>
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="input-box">
                    <input type="password" name="password" placeholder='Contraseña' required onChange={handleChange}></input>
                    <box-icon name='lock-alt' type='solid' class="i"></box-icon>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="input-box">
                    <input type="text" name="country" placeholder="País" required onChange={handleChange}></input>
                    <box-icon name='flag-alt' type='solid' ></box-icon>
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>
                <div className="input-box">
                        <select name="role" required onChange={handleChange}>
                            <option value="" disabled selected>Selecciona tu rol</option>
                            <option value="student">Estudiante</option>
                            <option value="teacher">Profesor</option>
                            <option value="assistant">Ayudante</option>
                        </select>
                        {errors.role && <p className="error">{errors.role}</p>}
                        <box-icon type='solid' name='face'></box-icon>
                </div>
        
                <button type="submit" className="btn">Crear cuenta</button>

                <div className="register-link">
                    <p>¿Ya tienes una cuenta? 
                        <a href="/login" className='auth-link'>
                        Iniciar Sesión
                        </a>
                    </p>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;