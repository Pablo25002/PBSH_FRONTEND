import axiosInstance from '../api/axiosInstance';

export const getCustomers = async () => {
    try {
        const response = await axiosInstance.get('/customers');
        return response.data; // El backend suele devolver una lista o un objeto con la lista
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al obtener clientes' };
    }
};

export const createCustomer = async (customerData) => {
    try {
        const response = await axiosInstance.post('/customers', customerData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al crear cliente' };
    }
};

export const updateCustomer = async (id, customerData) => {
    try {
        const response = await axiosInstance.put(`/customers/${id}`, customerData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al actualizar cliente' };
    }
};

export const deleteCustomer = async (id) => {
    try {
        const response = await axiosInstance.delete(`/customers/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Error al eliminar cliente' };
    }
};