import React, { useState } from 'react';
import './Login.css';
import validateRegistration from './RegistrationValidation'

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

        const validationErrors = validateRegistration(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registro exitoso');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    }

    return (
        <div class="wrapper">
            <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>

            <div class="input-box">
                <input type="text" name="username" placeholder="Nombre" required onChange={handleChange}></input>
                {errors.username && <p class="error">{errors.username}</p>}
                <box-icon name='user-circle'></box-icon>
            </div>
            <div class="input-box">
                <input type="text" name="email" placeholder="Correo electrónico" required onChange={handleChange}></input>
                {errors.email && <p classe="error">{errors.email}</p>}
                <box-icon type='solid' name='envelope' class="i"></box-icon>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder='Contraseña' required onChange={handleChange}></input>
                {errors.password && <p class="error">{errors.password}</p>}
                <box-icon name='lock-alt' type='solid' class="i"></box-icon>
            </div>
            <div class="input-box">
                <input type="text" name="country" placeholder="País" required onChange={handleChange}></input>
                {errors.country && <p class="error">{errors.country}</p>}
                <box-icon name='flag-alt' type='solid' ></box-icon>
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