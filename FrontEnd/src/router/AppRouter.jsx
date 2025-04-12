import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

// Pages
import HomePage from '../pages/HomePage/HomePage';


// Context
import { useAuth } from '../hooks/useAuth';

const AppRouter = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
            </Route>


            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRouter;