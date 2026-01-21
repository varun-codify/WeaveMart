import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('home_fashion_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await authAPI.login(email, password);
            const userData = {
                ...data.user,
                token: data.token
            };
            setUser(userData);
            localStorage.setItem('home_fashion_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw new Error(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name, email, password) => {
        setLoading(true);
        try {
            const data = await authAPI.register(name, email, password);
            const userData = {
                ...data.user,
                token: data.token
            };
            setUser(userData);
            localStorage.setItem('home_fashion_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw new Error(error.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('home_fashion_user');
        localStorage.removeItem('home_fashion_cart'); // Clear cart on logout
    };

    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
