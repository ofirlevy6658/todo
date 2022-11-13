import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todo } from "./pages/Todo";
import { LoginPage } from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Todo />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
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
