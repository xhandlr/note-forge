const validateRegistration = (name, value) => {
    switch (name) {
        case "username":
            if(!value) return "El nombre es obligatorio";
            return "";
        case "email":
            if (!value) return "Debe ingresar un correo electrónico";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Correo electrónico inválido";
            return '';
        case "password":
            if (!value) return "Debe ingresar una contraseña";
            if (value.length < 6) return "Mínimo 6 caracteres";
            return "";
        case "country":
            if (!value) return "El país es obligatorio";
            return "";
        case "role":
            if (!value) return "Debe seleccionar un rol"
            return "";
        default:
            return "";
    }
};

const validateRegistrationForm = (formData) => {
  const errors = {};
  Object.entries(formData).forEach(([name, value]) => {
    const error = validateRegistration(name, value);
    if (error) errors[name] = error;
  });
  return errors;
};

const registerUser = async (formData) => { // Async significa asincrónico, lo que permite utilizar await
    const validationErrors = validateRegistrationForm(formData);
    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors;
    }

    const response = await fetch('http://localhost:5000/register', { // fetch realiza una petición HTTP
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
    }

    return data;
};

export { registerUser, validateRegistration };
