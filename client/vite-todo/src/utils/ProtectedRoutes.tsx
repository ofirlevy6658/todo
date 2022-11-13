import React from "react";
import { Outlet, Navigate } from "react-router-dom";

type Props = {};

export const ProtectedRoutes = (props: Props) => {
  const token = false;
  return token ? <Outlet /> : <Navigate to="/login" />;
};
