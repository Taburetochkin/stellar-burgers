import { useSelector } from 'react-redux';
import { selectorUserAuthorized } from '../../services/slices/userSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
type ProtectedRouteProps = {
  Auth: boolean;
};

export const ProtectedRoute = ({ Auth = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthorized = useSelector(selectorUserAuthorized);
  const from = location.state?.from || '/';

  if (!Auth && isAuthorized) {
    return <Navigate to={from} />;
  }

  if (Auth && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
