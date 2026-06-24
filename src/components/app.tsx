import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomeScreen from '../pages/welcome-screen/welcome-screen.tsx';
import LoginScreen from '../pages/login-screen/login-screen.tsx';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen.tsx';
import OfferScreen from '../pages/offer-screen/offer-screen.tsx';
import { AppRoute, AuthorizationStatus } from '../constants.ts';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from './private-route/private-route.tsx';

interface AppProps {
  totalCountPlaces: number;
}

const USER_AUTH_STATUS = AuthorizationStatus.NoAuth;

function App ({ totalCountPlaces }: AppProps): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <WelcomeScreen
              totalCountPlaces={totalCountPlaces}
              userAuthStatus={USER_AUTH_STATUS}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen userAuthStatus={USER_AUTH_STATUS} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={USER_AUTH_STATUS}>
              <FavoritesScreen userAuthStatus={USER_AUTH_STATUS} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen userAuthStatus={USER_AUTH_STATUS} />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
