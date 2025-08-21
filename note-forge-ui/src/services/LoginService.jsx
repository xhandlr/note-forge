/**
 * Validates the login form fields
 * @param {string} name - The name of the field to validate
 * @param {string} value - The value of the field to validate
 * @returns {string} - An error message if validation fails, or an empty string if it passes
 */
const validateLogin = (name, value) => {
    switch (name) {
        case 'email':
            if (!value) return "Debe ingresar un correo electrónico";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Correo electrónico inválido";
            return '';
        case 'password':
            if (!value) return "Debe ingresar una contraseña";
            return '';
        default:
            return '';
    }
};

/**
 * Validates the login form fields
 * @param {Object} formData 
 * @returns {Object} - An object containing validation error messages
 */
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
          credentials: 'include',
      });

      const data = await response.json();

      // Verifica si el token está presente en las cookies
      if (response.ok) {
          return data;  // Si el login fue exitoso, el token ya está en las cookies
      } else {
          throw new Error(data.message || 'Login fallido');
      }
  } catch (error) {
      throw new Error('Error en el login: ' + error.message);
  }
};

/**
 * Logs out the user
 * @returns {Promise<Object>}
 */
const logoutUser = async () => {
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al cerrar sesión');
        }

        localStorage.removeItem('token');

        return { success: true, message: 'Sesión cerrada correctamente' };
    } catch (error) {
        console.error('Error al intentar cerrar sesión', error);
        throw new Error('Error al cerrar sesión: ' + error.message);
    }
};

/**
 * Checks if the user is authenticated
 * @returns {Promise<boolean>}
 */
const checkAuth = async () => {
    try {
        const response = await fetch("http://localhost:5000/check-auth", {
            method: "GET",
            credentials: "include", 
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "No autenticado");
        }

        return data.authenticated; 
    } catch (error) {
        console.error("Error verificando autenticación", error);
        return false;
    }
};


export { 
    loginUser, 
    validateLogin, 
    logoutUser, 
    checkAuth 
};