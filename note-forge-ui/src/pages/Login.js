import React, { useState } from 'react';
import '../styles/Login.css';
import { loginUser } from '../services/LoginService';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const [ errors, setErrors ] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData); 
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Login exitoso');
                navigate('/home');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            setErrors(error);
            console.error('Error en el login:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Correo electrónico" name="email" required onChange={handleChange}></input>
                        <box-icon type='solid' name='envelope' className="i"></box-icon>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' name="password" required onChange={handleChange}></input>
                        <box-icon name='lock-alt' type='solid' className="i"></box-icon>
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"></input>Mantener sesión iniciada</label>
                    </div>
    
                    <button type="submit" className="btn">Ingresar</button>
    
                    <div className="register-link">
                        <p>¿No tienes una cuenta? <a href="http://localhost:3000/register" className='auth-link'>Registrarse</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;