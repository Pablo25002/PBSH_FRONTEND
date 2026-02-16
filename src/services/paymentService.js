import axiosInstance from '../api/axiosInstance';

export const getPayments = async () => {
    const response = await axiosInstance.get('/payments');
    return response.data;
};

export const createPayment = async (data) => {
    const response = await axiosInstance.post('/payments', data);
    return response.data;
};

export const deletePayment = async (id) => {
    const response = await axiosInstance.delete(`/payments/${id}`);
    return response.data;
};