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

const logoutUser = async () => {
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include', // Para enviar cookies al backend
        });

        if (!response.ok) {
            throw new Error('Error al cerrar sesión');
        }

        return { success: true, message: 'Sesión cerrada correctamente' };
    } catch (error) {
        console.error('Error al intentar cerrar sesión', error);
        throw new Error('Error al cerrar sesión: ' + error.message);
    }
};

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


export { loginUser, validateLogin, logoutUser, checkAuth };