import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Must match the key used in SignIn.jsx
  const isAuthenticated = localStorage.getItem('token');  

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;