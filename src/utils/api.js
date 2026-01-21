// API base URL
const API_URL = '/api';

// Helper function to get auth token
const getAuthToken = () => {
    const user = localStorage.getItem('home_fashion_user');
    if (user) {
        const userData = JSON.parse(user);
        return userData.token;
    }
    return null;
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Auth API
export const authAPI = {
    register: (name, email, password) =>
        apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        }),
    
    login: (email, password) =>
        apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
    
    getMe: () => apiRequest('/auth/me'),
};

// Products API
export const productsAPI = {
    getAll: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return apiRequest(`/products${query ? `?${query}` : ''}`);
    },
    
    getById: (id) => apiRequest(`/products/${id}`),
    
    create: (productData) =>
        apiRequest('/products', {
            method: 'POST',
            body: JSON.stringify(productData),
        }),
    
    update: (id, productData) =>
        apiRequest(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        }),
    
    delete: (id) =>
        apiRequest(`/products/${id}`, {
            method: 'DELETE',
        }),
};

// Cart API
export const cartAPI = {
    get: () => apiRequest('/cart'),
    
    add: (productId, quantity = 1) =>
        apiRequest('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        }),
    
    update: (productId, quantity) =>
        apiRequest('/cart/update', {
            method: 'PATCH',
            body: JSON.stringify({ productId, quantity }),
        }),
    
    remove: (productId) =>
        apiRequest(`/cart/remove/${productId}`, {
            method: 'DELETE',
        }),
    
    clear: () =>
        apiRequest('/cart/clear', {
            method: 'DELETE',
        }),
};

// Orders API
export const ordersAPI = {
    create: (orderData) =>
        apiRequest('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        }),
    
    getMyOrders: () => apiRequest('/orders/my-orders'),
    
    getAll: () => apiRequest('/orders'),
    
    getById: (id) => apiRequest(`/orders/${id}`),
    
    updateStatus: (id, status) =>
        apiRequest(`/orders/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),
};
