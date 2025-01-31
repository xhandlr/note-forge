import React, { useState } from 'react'; // Importa useState que es un hook que permite manejar el estado
import '../styles/Login.css';
import { registerUser } from '../services/RegistrationService'; // Importa la función registerUser

function Registration() { // Declara un componente funcional
    const [formData, setFormData] = useState({ // Crea un estado llamado formData que almacena los datos del formulario
        username: '', // setFormData es la función que actualiza el estado
        email: '', // useState inicializa el estado de un objeto vacío que sigue la estructura del formulario
        password: '',
        country: '',
        role: ''
    });

    const [errors, setErrors] = useState({}); // Errors es una variable de estado donde se almacenan los errores
    // setErrors es una función para actualizar errors
    // useState declara el estado inicial de un objeto vacío

    const handleChange = (e) => { // Función que maneja cambios en los inputs, donde e es el evento que dispara el cambio
        setFormData({
            ...formData, // Copia los valores actuales del formulario
            [e.target.name]: e.target.value // Actualiza el campo que cambió
        });
    }

    const handleSubmit = async (e) => {
        try {
            const data = await registerUser(formData); // Llama a la función externa y espera que llegue la respuesta del servidor
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
    /* Se llama a la función handleSubmit cuando se dispara el evento onSubmit */
    
    return (
        <div class="wrapper">
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

            <div class="register-link">
                <p>¿Ya tienes una cuenta? <a href="http://localhost:3000/login">Iniciar Sesión</a>
                </p>
                </div>
            </form>
        </div>
    );
}

export default Registration;