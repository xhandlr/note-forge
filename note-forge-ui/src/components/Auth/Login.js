import React from 'react';
import './Login.css';

function Login() {
    return(
        <div class="wrapper">
            <form action="https://google.com"></form>
            <h1>Iniciar Sesión</h1>
            <div class="input-box">
                <input type="text" placeholder="Correo electrónico" required></input>
                <box-icon type='solid' name='envelope' class="i"></box-icon>
            </div>
            <div class="input-box">
                <input type="password" placeholder='Contraseña' required></input>
                <box-icon name='lock-alt' type='solid' class="i"></box-icon>
            </div>
            <div class="remember-forgot">
                <label><input type="checkbox"></input>Recordarme</label>
            </div>
            
            <button type="submit" class="btn">Ingresar</button>

            <div class="register-link">
                <p>¿No tienes una cuenta? <a href="http://localhost:3000/register">Registrarse</a>
                </p>
            </div>
    
        </div>
    );
}

export default Login;