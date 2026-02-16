import axios from 'axios';

const axiosInstance = axios.create({
    // Asegúrate de que este puerto sea donde corre tu Backend
    baseURL: 'https://pbsh-backend.onrender.com/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para pegar el token en cada petición
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Usamos 'x-token' porque así lo pide tu validarJWT
        config.headers['x-token'] = token; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;