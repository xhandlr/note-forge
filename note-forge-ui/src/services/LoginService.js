const validateLogin = (formData) => {
    const errors = {};

    if (!formData.email) errors.email = "Debe ingresar un correo electrónico";
    if (!formData.password) errors.password = "Debe ingresar una contraseña"

    return errors;
};

const loginUser = async (formData) => { // Constante que almacena una función flecha asincrónica
    // Primero se verifican los errores
    const validationErrors = validateLogin(formData)
    if (Object.keys(validationErrors).length > 0) { // Cuenta la cantidad de claves que tiene el objeto
        throw validationErrors; // Lanza una excepción
    }

    try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
    
        // Verificar si el servidor devuelve un token
        if (data.token) {
          return data;
        } else {
          throw new Error('No se recibió un token. Error: ' + data.message || 'Desconocido');
        }
      } catch (error) {
        console.error('Error al intentar hacer login', error);
        throw new Error('Error en el login: ' + error.message);
      }
    };

export { loginUser, validateLogin };