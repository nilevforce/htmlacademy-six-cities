import { ReactElement, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import router from '../../router.ts';
import Loader from '../loader/loader.tsx';
import { checkAuth } from '../../store/user/user-api-actions.ts';
import useAppSelector from '../../hooks/use-app-selector.ts';
import { getAuthStatus } from '../../store/user/user-selectors.ts';
import { AuthorizationStatus } from '../../constants.ts';
import { fetchOffers } from '../../store/offers/offers-api-actions.ts';
import {
  fetchFavoriteOffers
} from '../../store/favorite-offers/favorite-offers-api-actions.ts';

// TODO: Пофиксить проблему со скроллом

function App (): ReactElement {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const [isAppInitializing, setIsAppInitializing] = useState<boolean>(true);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authStatus !== AuthorizationStatus.Unknown) {
      dispatch(fetchOffers()).finally(() => setIsAppInitializing(false));
    }

    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authStatus]);

  if (isAppInitializing) {
    return <Loader />;
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
