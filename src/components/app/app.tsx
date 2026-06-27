import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import { Offer } from '../../types/offer.ts';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import FavoritesScreenEmpty
  from '../../pages/favorites-screen-empty/favorites-screen-empty.tsx';
import WelcomeScreenEmpty
  from '../../pages/welcome-screen-empty/welcome-screen-empty.tsx';

interface AppProps {
  offers: Offer[];
  favorites: Offer[];
}

const USER_AUTH_STATUS = AuthorizationStatus.Auth;

function App ({
  offers = [],
  favorites = []
}: AppProps): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            offers.length
              ?
              <WelcomeScreen offers={offers} userAuthStatus={USER_AUTH_STATUS} />
              : <WelcomeScreenEmpty userAuthStatus={USER_AUTH_STATUS} />
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
              {
                favorites.length
                  ?
                  <FavoritesScreen userAuthStatus={USER_AUTH_STATUS} favorites={favorites} />
                  : <FavoritesScreenEmpty userAuthStatus={USER_AUTH_STATUS} />
              }
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <OfferScreen
              userAuthStatus={USER_AUTH_STATUS}
              offers={offers}
            />
          }
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
