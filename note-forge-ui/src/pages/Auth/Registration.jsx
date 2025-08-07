import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';

// Registration service import
import { registerUser } from '../../services/RegistrationService';

// UI Components
import Button from '../../components/UI/Button';
import Icon from '../../components/UI/Icon';
import BgDecoration from '../../components/UI/BgDecoration';
import TextField from '../../components/UI/TextField';

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
        <div className="flex items-center justify-center min-h-screen h-screen">
            <BgDecoration 
                file="orange.png"
                position='top-0 left-0'
            />
            <BgDecoration 
                file="yellow.png"
                position='top-0 right-0'
            />
            <div className="min-w-[600px] w-1/3 h-[80vh] bg-white text-black rounded-lg border-2 border-gray-200 flex flex-col justify-start items-center p-10">
            <div className="flex flex-col items-center w-full">
                <Icon
                    size='w-25 h-25'
                ></Icon>
                <div className="w-full flex flex-col items-center gap-y-4">
                    <form onSubmit={handleSubmit} className="mt-10 w-full flex flex-col items-center gap-y-4">
                        <h1 className='text-2xl font-bold'>Iniciar Sesión</h1>
                        <TextField
                            type="text"
                            name="username"
                            placeholder="Nombre de usuario"
                            required
                            onChange={handleChange}
                            error={errors.username}
                        />
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
                        <TextField
                            type="text"
                            name="country"
                            placeholder="País"
                            required
                            onChange={handleChange}
                            error={errors.country}
                        />
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
                        <Button 
                            children={'Crear cuenta'}
                            type='submit'
                        />
                        <div>
                            <p>¿Ya tienes una cuenta? <Link to="/login" className='font-semibold hover:text-pink-600'>Iniciar Sesión</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Registration;