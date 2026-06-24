import { ReactElement } from 'react';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  authStatus: AuthorizationStatus;
  children: ReactElement;
}

function PrivateRoute ({
  authStatus,
  children
}: PrivateRouteProps): ReactElement {
  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
