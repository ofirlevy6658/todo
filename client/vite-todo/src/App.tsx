import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoAppPage } from './pages/TodoAppPage';
import { LoginPage } from './pages/LoginPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoutes } from './utils/ProtectedRoutes';
import { RegisterPage } from './pages/RegisterPage';

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <TodoAppPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
