/**
 * App service for managing send requests
 * This service sends an HTTP request to the API
 * @param {string} route - HTTP request endpoint
 * @param {string} method - Type of method used
 * @param {Object|FormData|null} [body=null] - JSON data
 * @returns {Promise<Object>} Async function returns an object
 */
const sendRequest = async (route, method, body = null) => {
    const token = localStorage.getItem('token');

    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    if (body) {
        if (body instanceof FormData) {
            options.body = body; 
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
    }

    const response = await fetch(route, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
    }

    return data;
};

export { sendRequest };
