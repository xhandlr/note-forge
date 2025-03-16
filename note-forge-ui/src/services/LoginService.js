const validateLogin = (formData) => {
    const errors = {};

    if (!formData.email) errors.email = "Debe ingresar un correo electrónico";
    if (!formData.password) errors.password = "Debe ingresar una contraseña"

    return errors;
};

const loginUser = async (formData) => {
  const validationErrors = validateLogin(formData);
  if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
  }

  try {
      const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include', // Esto es importante para enviar cookies
      });

      const data = await response.json();

      // Verifica si el token está presente en las cookies
      if (response.ok) {
          return data;  // Si el login fue exitoso, el token ya está en las cookies
      } else {
          throw new Error(data.message || 'Login fallido');
      }
  } catch (error) {
      console.error('Error al intentar hacer login', error);
      throw new Error('Error en el login: ' + error.message);
  }
};


export { loginUser, validateLogin };