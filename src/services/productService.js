import axiosInstance from '../api/axiosInstance';

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al obtener productos' };
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axiosInstance.post('/products', productData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al crear producto' };
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axiosInstance.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al actualizar producto' };
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al eliminar producto' };
    }
};