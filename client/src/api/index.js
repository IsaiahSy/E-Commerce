import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
export const verifyUserAccount = (id) => API.get(`/users/${id}`);

export const fetchAllProducts = () => API.get('/products');
export const getProductDetail = (id) => API.get(`/products/${id}`);

export const fetchCartProducts = () => API.get('/cart');
export const addCartProduct = (productData) => API.post('/cart/add', productData);