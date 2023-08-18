import { Navigate } from 'react-router-dom';

const token = localStorage.getItem('auth_token');
const role = localStorage.getItem('role');

export const AdminRoute = ({ children, role }) => {
  const authorize = () => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    if (role !== 'ROLE_ADMIN') {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  };

  return authorize();
};
