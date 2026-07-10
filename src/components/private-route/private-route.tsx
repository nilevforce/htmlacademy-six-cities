import { ReactElement } from 'react';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface PrivateRouteProps {
  children: ReactElement;
}

function PrivateRoute ({
  children
}: PrivateRouteProps): ReactElement {
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    authStatus === AuthorizationStatus.Auth
      ? children || <Outlet />
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
