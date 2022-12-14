import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const accessToken = sessionStorage.getItem('accessToken') ?? localStorage.getItem('accessToken');
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
