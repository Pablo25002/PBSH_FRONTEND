import axiosInstance from '../api/axiosInstance';

export const loginUser = async (email, password) => {
    try {
        // Hacemos el POST al controlador que me pasaste
        const response = await axiosInstance.post('/auth/login', { email, password });
        
        // Si el backend responde con el token, lo guardamos
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        
        return response.data;
    } catch (error) {
        // Capturamos el error (Usuario no encontrado / Contraseña incorrecta)
        throw error.response ? error.response.data : { msg: 'Error de conexión' };
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};