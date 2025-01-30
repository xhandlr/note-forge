import React, { useState } from 'react';
import '../styles/Login.css';
import { registerUser } from '../services/RegistrationService';

function Registration() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
        role: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const data = await registerUser(formData); // Llama a la función correctamente
            if (data.message) {
                alert('Registro exitoso');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            setErrors(error); // Actualiza los errores si hay problemas de validación o en el backend
            console.error('Error en el registro:', error);
        }
    };
    
    
    return (
        <div class="wrapper">
            <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>

            <div class="input-box">
                <input type="text" name="username" placeholder="Nombre" required onChange={handleChange}></input>
                <box-icon name='user-circle'></box-icon>
                {errors.username && <p class="error">{errors.username}</p>}
            </div>
            <div class="input-box">
                <input type="text" name="email" placeholder="Correo electrónico" required onChange={handleChange}></input>
                <box-icon type='solid' name='envelope' class="i"></box-icon>
                {errors.email && <p class="error">{errors.email}</p>}
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder='Contraseña' required onChange={handleChange}></input>
                <box-icon name='lock-alt' type='solid' class="i"></box-icon>
                {errors.password && <p class="error">{errors.password}</p>}
            </div>
            <div class="input-box">
                <input type="text" name="country" placeholder="País" required onChange={handleChange}></input>
                <box-icon name='flag-alt' type='solid' ></box-icon>
                {errors.country && <p class="error">{errors.country}</p>}
            </div>
            <div class="input-box">
                    <select name="role" required onChange={handleChange}>
                        <option value="" disabled selected>Selecciona tu rol</option>
                        <option value="student">Estudiante</option>
                        <option value="teacher">Profesor</option>
                        <option value="assistant">Ayudante</option>
                    </select>
                    {errors.role && <p class="error">{errors.role}</p>}
                    <box-icon type='solid' name='face'></box-icon>
            </div>
    
            <button type="submit" class="btn">Crear cuenta</button>

            <div class="register-link">
                <p>¿Ya tienes una cuenta? <a href="http://localhost:3000/login">Iniciar Sesión</a>
                </p>
                </div>
            </form>
        </div>
    );
}

export default Registration;