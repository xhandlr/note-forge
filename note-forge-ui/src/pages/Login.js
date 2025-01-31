import React, { useState } from 'react';
import '../styles/Login.css';
import { loginUser } from '../services/LoginService';


function Login() {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            if (response.message) {
                alert("Login exitoso");
            } else {
                alert(`Error: ${response.message}`)
            }
        } catch (error) {
            setErrors(error);
            console.error('Error en el inicio de sesión', error)
        }
    };

    return(
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <div className="input-box">
                <input type="text" placeholder="Correo electrónico" name="email" required onChange={handleChange}></input>
                <box-icon type='solid' name='envelope' className="i"></box-icon>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Contraseña' name="password" required onChange={handleChange}></input>
                <box-icon name='lock-alt' type='solid' className="i"></box-icon>
            </div>
            <div className="remember-forgot">
                <label><input type="checkbox"></input>Mantener sesión iniciada</label>
            </div>
            
            <button type="submit" className="btn">Ingresar</button>

            <div className="register-link">
                <p>¿No tienes una cuenta? <a href="http://localhost:3000/register">Registrarse</a>
                </p>
            </div>
            </form>
        </div>
    );
}

export default Login;