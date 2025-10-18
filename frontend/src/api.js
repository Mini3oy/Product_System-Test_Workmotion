import axios from 'axios';


export const api = axios.create({ baseURL: '/api' });


export const ProductAPI = {
    list: (params) => api.get('/products', { params }).then(r => r.data),
    get: (id) => api.get(`/product/${id}`).then(r => r.data),
    create: (payload) => api.post('/product', payload).then(r => r.data),
    update: (id, payload) => api.put(`/product/${id}`, payload).then(r => r.data),
    remove: (id, hard = false) => api.delete(`/product/${id}`, { params: { hard } }).then(r => r.data)
};


export const CategoryAPI = {
    list: (params) => api.get('/categories', { params }).then(r => r.data),
    get: (id) => api.get(`/category/${id}`).then(r => r.data),
    create: (payload) => api.post('/category', payload).then(r => r.data),
    update: (id, payload) => api.put(`/category/${id}`, payload).then(r => r.data),
    remove: (id, hard = false) => api.delete(`/category/${id}`, { params: { hard } }).then(r => r.data)
};