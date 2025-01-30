const validateRegistration = (formData) => {
    const errors = {};

    if (!formData.username) errors.username = "El nombre es obligatorio";
    if (!formData.email.includes("@")) errors.email = "Correo inválido";
    if (formData.password.length < 6) errors.password = "Mínimo 6 caracteres";
    if (!formData.country) errors.country = "El país es obligatorio";
    if (!formData.role) errors.role = "Selecciona un rol";

    return errors;
};

const registerUser = async (formData) => {
    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors; // Lanza los errores para que el componente los maneje
    }

    const response = await fetch('http://localhost:5000/register', {
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
