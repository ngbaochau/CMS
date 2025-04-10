import React, { createContext, useEffect, useState, useContext } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            if (token && userData) {
                setUser(JSON.parse(userData));
                setIsAuthenticated(true);
            }

            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };
    const register = async (userData) => {
        console.log('Registering user:', userData);
        return { success: true };
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
