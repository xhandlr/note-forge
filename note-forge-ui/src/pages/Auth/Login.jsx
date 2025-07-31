import React, { useState } from 'react';
import { loginUser } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import Logotype from '../../components/Dashboard/Logotype';
import Icon from '../../components/Dashboard/Icon';

/**
 * Login.jsx
 * Componente de página que permite iniciar sesión en la aplicación.
 * Permite a los usuarios ingresar su correo electrónico y contraseña.
 * También incluye una opción para mantener la sesión iniciada. 
 * 
 * @component
 * @returns {JSX.Element}
 */

function Login() {

    // Hooks para manejar el estado del formulario y errores
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });
    const [ errors, setErrors ] = useState({});

    // Hook para la navegación
    const navigate = useNavigate();

    /**
     * Se ejecuta cada vez que el usuario cambia algo en el formulario.
     * Actualiza el estado del formulario con los valores ingresados.
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
     * Esta función se ejecuta al enviar el formulario.
     * Llama al servicio de login con los datos del formulario.
     * Si el login es exitoso, guarda el token en localStorage y redirige al usuario al dashboard.
     * Si hay un error, muestra una alerta con el mensaje de error.
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
        <div className="bg-(--color-primary) text-black">
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
    );
}

export default Login;