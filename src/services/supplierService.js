import axiosInstance from '../api/axiosInstance';

export const getSuppliers = async () => {
    try {
        const response = await axiosInstance.get('/suppliers');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al conectar con proveedores' };
    }
};

export const createSupplier = async (data) => {
    const response = await axiosInstance.post('/suppliers', data);
    return response.data;
};

export const updateSupplier = async (id, data) => {
    const response = await axiosInstance.put(`/suppliers/${id}`, data);
    return response.data;
};

export const deleteSupplier = async (id) => {
    const response = await axiosInstance.delete(`/suppliers/${id}`);
    return response.data;
};