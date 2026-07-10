import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { AppRoute } from './constants.ts';
import WelcomeScreen from './pages/welcome-screen/welcome-screen.tsx';
import LoginScreen from './pages/login-screen/login-screen.tsx';
import NotFoundScreen from './pages/not-found-screen/not-found-screen.tsx';
import OfferScreen from './pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from './pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from './components/private-route/private-route.tsx';

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: React.createElement(WelcomeScreen)
  },
  {
    path: AppRoute.Login,
    element: React.createElement(LoginScreen)
  },
  {
    path: AppRoute.Offer,
    element: React.createElement(OfferScreen)
  },
  {
    element: React.createElement(PrivateRoute),
    children: [
      {
        path: AppRoute.Favorites,
        element: React.createElement(FavoritesScreen)
      }
    ]
  },
  {
    path: AppRoute.NotFound,
    element: React.createElement(NotFoundScreen)
  },
  {
    path: '*',
    loader: () => redirect(AppRoute.NotFound)
  }
]);

export default router;
