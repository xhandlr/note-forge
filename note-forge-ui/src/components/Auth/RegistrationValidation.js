const validateRegistration = (data) => {
    let errors = {};

    if (!data.username.trim()) {
        errors.username = 'El nombre es obligatorio';
    }

    if (!data.email) {
        errors.email= 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'El correo no es válido';
    }

    if (!data.password) {
        errors.password = 'La contraseña es obligatoria';
    } else if (data.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!data.country.trim()) {
        errors.country = 'El país es obligatorio';
    }

    if (!data.role) {
        errors.role = 'Debes seleccionar un rol';
    }

    return errors;
};

export default validateRegistration;
