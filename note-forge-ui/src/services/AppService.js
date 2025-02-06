const sendRequest = async (route, method, body = null) => {
    const token = localStorage.getItem('token');

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);  // Solo agregar el cuerpo si se pasa
    }

    const response = await fetch(route, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
    }

    return data;
};

export { sendRequest };
